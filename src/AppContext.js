import React, { useContext, useEffect, useState } from 'react'
import { vibrate } from './utils'
import DbContext from './DbContext'

const AppContext = React.createContext()

export const AppContextProvider = ( props ) => {
  const { AppTitle, db, renewDb } = useContext(DbContext)
  const { routeList } = db

  // search route
  const [searchRoute, setSearchRoute] = useState("")
  // selected route for bottom navigation shortcut
  const [selectedRoute, setSelectedRoute] = useState('1-1-CHUK-YUEN-ESTATE-STAR-FERRY')
  // Geo Permission for UX
  const [ geoPermission, setGeoPermission ] = useState( localStorage.getItem('geoPermission') ) 
  const [ geolocation, setGeolocation ] = useState (JSON.parse(localStorage.getItem('geolocation')) || {lat: 22.302711, lng: 114.177216})
  const [ geoWatcherId, setGeoWatcherId ] = useState ( null )

  // hot query count
  const [ hotRoute, setHotRoute ] = useState( JSON.parse(localStorage.getItem('hotRoute')) || {} )
  const [ savedEtas, setSavedEtas ] = useState ( JSON.parse(localStorage.getItem('savedEtas')) || [] )

  // possible Char for RouteInputPad
  const [possibleChar, setPossibleChar] = useState(getPossibleChar(searchRoute, routeList) || [])

  // color mode
  const devicePreferColorScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const [ colorMode, setColorMode ] = useState(localStorage.getItem('colorMode') || devicePreferColorScheme )

  useEffect(() => {
    if ( geoPermission === 'granted' ) {
      const _geoWatcherId = navigator.geolocation.watchPosition(({coords: {latitude, longitude}}) => {
        updateGeolocation({lat: latitude, lng: longitude})
      })
      setGeoWatcherId ( _geoWatcherId )
    }
    return () => {
      if ( geoWatcherId ) navigator.geolocation.clearWatch(geoWatcherId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateGeoPermission = (geoPermission) => {
    setGeoPermission(geoPermission)
    if ( geoPermission === 'granted' ) {
      const _geoWatcherId = navigator.geolocation.watchPosition(({coords: {latitude, longitude}}) => {
        setGeolocation({lat: latitude, lng: longitude})
      })
      setGeoWatcherId ( _geoWatcherId )
    } else if ( geoWatcherId ) {
      navigator.geolocation.clearWatch(geoWatcherId)
      setGeoWatcherId(null)
    }
    localStorage.setItem('geoPermission', geoPermission)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const updateGeolocation = (geolocation) => {
    localStorage.setItem('geolocation', JSON.stringify(geolocation))
    setGeolocation(geolocation)
  }

  const toggleColorMode = () => setColorMode(prevColorMode => {
    const colorMode = prevColorMode === 'dark' ? 'light' : 'dark'
    localStorage.setItem('colorMode', colorMode)
    return colorMode
  })
  
  const updateSearchRouteByButton = (buttonValue) => {
    vibrate(1)
    setTimeout(() => {
      setSearchRoute(prevSearchRoute => {
        let ret
        switch (buttonValue) {
          case 'b': 
            ret = prevSearchRoute.slice(0,-1)
            break
          case 'c':
            ret = ''
            break
          default: 
            ret = prevSearchRoute + buttonValue
        }
        setPossibleChar( getPossibleChar(ret, routeList) )
        return ret
      })
    }, 0)
  }

  const updateSelectedRoute = ( route, seq = '' ) => {
    setSelectedRoute ( `${route}/${seq}` )
    if ( seq ) {
      setHotRoute( prevHotRoute => {
        prevHotRoute[route+'/'+seq] = hotRoute[route+'/'+seq] ? hotRoute[route+'/'+seq] + 1 : 1
        localStorage.setItem('hotRoute', JSON.stringify(prevHotRoute))
        return prevHotRoute
      })
    }
  }

  const updateSavedEtas = ( key ) => {
    setSavedEtas ( prevSavedEtas => {
      const newSavedEtas = prevSavedEtas.concat(key).filter( (v, i, s) => s.indexOf(v) === i )
      localStorage.setItem('savedEtas', JSON.stringify(newSavedEtas))
      return newSavedEtas
    })
  }

  const resetUsageRecord = () => {
    setHotRoute({})
    updateGeolocation({lat: 22.302711, lng: 114.177216})
    setSavedEtas([])
  }

  return (
    <AppContext.Provider value={{
        AppTitle, db,
        searchRoute, setSearchRoute, updateSearchRouteByButton,
        selectedRoute, updateSelectedRoute,
        possibleChar,
        // UX
        hotRoute, geolocation, updateGeolocation,
        savedEtas, updateSavedEtas,
        resetUsageRecord,
        // settings
        renewDb,
        geoPermission, updateGeoPermission,
        colorMode , toggleColorMode
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext

const getPossibleChar = ( searchRoute, routeList ) => {
  if ( routeList == null ) return []
  let possibleChar = {}
  Object.entries(routeList).forEach(route => {
    if ( route[0].startsWith(searchRoute.toUpperCase()) ) {
      let c = route[0].slice(searchRoute.length, searchRoute.length+1)
      possibleChar[c] = isNaN(possibleChar[c]) ? 1 : ( possibleChar[c] + 1)
    }
  })
  return Object.entries(possibleChar).map(k => k[0]).filter(k => k !== '-')
}
