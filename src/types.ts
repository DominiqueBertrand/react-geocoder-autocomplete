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
} from '@geoapify/geocoder-autocomplete';

export {
  GeocoderAutocomplete,
  LocationType,
  SupportedLanguage,
  GeoPosition,
  CountyCode,
  ByCountryCodeOptions,
  ByCircleOptions,
  ByRectOptions,
  ByProximityOptions,
};

export interface GeoapifyGeocoderAutocompleteOptions {
  value?: string;
  type?: LocationType;
  lang?: SupportedLanguage;
  limit?: number;
  placeholder?: string;
  filterByCountryCode?: ByCountryCodeOptions;
  filterByCircle?: ByCircleOptions;
  filterByRect?: ByRectOptions;
  biasByCountryCode?: ByCountryCodeOptions;
  biasByCircle?: ByCircleOptions;
  biasByRect?: ByRectOptions;
  biasByProximity?: ByProximityOptions;
  position?: GeoPosition;
  countryCodes?: CountyCode[];

  skipIcons?: boolean;
  skipDetails?: boolean;

  debounceDelay?: number;

  placeSelect: (value: any) => {};
  suggestionsChange?: (value: any) => {};

  preprocessHook?: (value: string) => string;
  postprocessHook?: (feature: any) => string;
  suggestionsFilter?: (suggestions: any[]) => any[];
}
