import React, { useEffect, useRef, MutableRefObject } from 'react';
import {
  GeocoderAutocomplete,
  LocationType,
  SupportedLanguage,
  GeoPosition,
  CountyCode,
  ByCountryCodeOptions,
  ByCircleOptions,
  ByRectOptions,
  ByProximityOptions,
  GeoapifyGeocoderAutocompleteOptions,
} from './types';

export const GeoapifyApiKey = React.createContext<string>('');

export const GeoapifyContext = (props: any) => {
  return (
    <GeoapifyApiKey.Provider value={props.apiKey}>
      {props.children}
    </GeoapifyApiKey.Provider>
  );
};

export const GeoapifyGeocoderAutocomplete = ({
  placeholder: placeholderValue,
  type: typeValue,
  lang: langValue,
  limit: limitValue,
  value: valueValue,
  filterByCountryCode: filterByCountryCodeValue,
  filterByCircle: filterByCircleValue,
  filterByRect: filterByRectValue,
  biasByCountryCode: biasByCountryCodeValue,
  biasByCircle: biasByCircleValue,
  biasByRect: biasByRectValue,
  biasByProximity: biasByProximityValue,
  position: positionValue,
  countryCodes: countryCodesValue,
  skipIcons: skipIconsValue,
  skipDetails: skipDetailsValue,
  debounceDelay: debounceDelayValue,
  preprocessHook: preprocessHookValue,
  postprocessHook: postprocessHookValue,
  suggestionsFilter: suggestionsFilterValue,
  placeSelect: placeSelectCallback,
  suggestionsChange: suggestionsChangeCallback,
}: GeoapifyGeocoderAutocompleteOptions) => {
  const apiKey = React.useContext<string>(GeoapifyApiKey);
  let geocoderContainer: HTMLDivElement | null;
  let initialized: boolean = false;
  let geocoderAutocomplete: MutableRefObject<GeocoderAutocomplete | undefined> =
    useRef<GeocoderAutocomplete>();

  const placeSelectCallbackRef: MutableRefObject<
    ((value: any) => {}) | undefined
  > = useRef<(value: any) => {}>();
  const suggestionsChangeCallbackRef: MutableRefObject<
    ((value: any) => {}) | undefined
  > = useRef<(value: any) => {}>();

  placeSelectCallbackRef.current = placeSelectCallback;
  suggestionsChangeCallbackRef.current = suggestionsChangeCallback;

  const onSelect = React.useCallback((value: any) => {
    if (placeSelectCallbackRef.current) {
      placeSelectCallbackRef.current(value);
    }
  }, []);

  const onSuggestions = React.useCallback((value: any) => {
    if (suggestionsChangeCallbackRef.current) {
      suggestionsChangeCallbackRef.current(value);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      if (geocoderAutocomplete.current) {
        geocoderAutocomplete.current.off('select', onSelect);
        geocoderAutocomplete.current.off('suggestions', onSuggestions);
      }

      return;
    }

    initialized = true;

    geocoderAutocomplete.current = new GeocoderAutocomplete(
      geocoderContainer as HTMLDivElement,
      apiKey,
      {
        placeholder: placeholderValue || '',
        skipDetails: skipDetailsValue,
        skipIcons: skipIconsValue,
        debounceDelay: debounceDelayValue,
      }
    );

    geocoderAutocomplete.current.on('select', onSelect);
    geocoderAutocomplete.current.on('suggestions', onSuggestions);
  }, []);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setType(typeValue as LocationType);
    }
  }, [typeValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setLang(langValue as SupportedLanguage);
    }
  }, [langValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      console.warn(
        "WARNING! Obsolete function called. The  'position' input has been deprecated, please use the new 'biasByLocation' input instead!"
      );
      geocoderAutocomplete.current.addBiasByProximity(
        positionValue as GeoPosition
      );
    }
  }, [positionValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      console.warn(
        "WARNING! Obsolete function called. The  'countryCodes' input has been deprecated, please use the new 'filterByCountryCode' input instead!"
      );
      geocoderAutocomplete.current.addFilterByCountry(
        countryCodesValue as CountyCode[]
      );
    }
  }, [countryCodesValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setLimit(limitValue as number);
    }
  }, [limitValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setValue((valueValue as string) || '');
    }
  }, [valueValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addFilterByCountry(
        filterByCountryCodeValue as ByCountryCodeOptions
      );
    }
  }, [filterByCountryCodeValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addFilterByCircle(
        filterByCircleValue as ByCircleOptions
      );
    }
  }, [filterByCircleValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addFilterByRect(
        filterByRectValue as ByRectOptions
      );
    }
  }, [filterByRectValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByCountry(
        biasByCountryCodeValue as ByCountryCodeOptions
      );
    }
  }, [biasByCountryCodeValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByCircle(
        biasByCircleValue as ByCircleOptions
      );
    }
  }, [biasByCircleValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByRect(
        biasByRectValue as ByRectOptions
      );
    }
  }, [biasByRectValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByProximity(
        biasByProximityValue as ByProximityOptions
      );
    }
  }, [biasByProximityValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setPreprocessHook(preprocessHookValue);
    }
  }, [preprocessHookValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setPostprocessHook(postprocessHookValue);
    }
  }, [postprocessHookValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setSuggestionsFilter(suggestionsFilterValue);
    }
  }, [suggestionsFilterValue]);

  return (
    <div
      className='geocoder-container'
      style={{ position: 'relative' }}
      ref={(el) => (geocoderContainer = el)}
    ></div>
  );
};
