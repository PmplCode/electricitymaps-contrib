from electricitymap.contrib.config import ZONES_CONFIG

EMBER_ZONES = [
    "AR",
    "AW",
    "BA",
    "BD",
    "BO",
    "CH",
    "CO",
    "CR",
    "CY",
    "DO",
    "GB",
    "GE",
    "GF",
    "GT",
    "HN",
    "IL",
    "IQ",
    "IS",
    "KR",
    "KW",
    "LK",
    "MD",
    "MN",
    "MT"
    "MX",
    "NG",
    "NI",
    "NO",
    "PA",
    "PE",
    "PF",
    "RU",
    "SG",
    "SV",
    "TH",
    "TR",
    "TW",
    "UA",
    "UY",
    "ZA",
]


ENTSOE_ZONES = [
    "AL",
    "AT",
    "BE",
    "BG",
    "CZ",
    "DE",
    "DK-DK1",
    "DK-DK2",
    "EE",
    "ES",
    "FI",
    "FR",
    "GR",
    "HR",
    "HU",
    "IE",
    "LT",
    "LU",
    "LV",
    # "MT",
    "ME",
    "MK",
    "NL",
    "NO-NO1",
    "NO-NO2",
    "NO-NO3",
    "NO-NO4",
    "NO-NO5",
    "PL",
    "PT",
    "RO",
    "SI",
    "SK",
    "RS",
    "XK",
]
AGGREGATED_ZONE_MAPPING = {
    "DK": ZONES_CONFIG["DK"]["subZoneNames"],
    "NO": ZONES_CONFIG["NO"]["subZoneNames"],
    "BR": ZONES_CONFIG["BR"]["subZoneNames"],
    "AU": ZONES_CONFIG["AU"]["subZoneNames"],
    "US": ZONES_CONFIG["US"]["subZoneNames"],
}

IRENA_ZONES = {
    "Albania": "AL",
    "Argentina": "AR",
    "Aruba": "AW",
    "Austria": "AT",
    "Bangladesh": "BD",
    "Belgium": "BE",
    "Bolivia (Plurinational State of)": "BO",
    "Bosnia and Herzegovina": "BA",
    "Bulgaria": "BG",
    "Chile": "CL-SEN",
    "China, Hong Kong Special Administrative Region": "HK",
    "Chinese Taipei": "TW",
    "Colombia": "CO",
    "Costa Rica": "CR",
    "Croatia": "HR",
    "Cyprus": "CY",
    "Czechia": "CZ",
    "Estonia": "EE",
    "Faroe Islands": "FO",
    "Finland": "FI",
    "France": "FR",
    "French Guiana": "GF",
    "French Polynesia": "PF",
    "Georgia": "GE",
    "Germany": "DE",
    "Greece": "GR",
    "Guadeloupe": "GP",
    "Guatemala": "GT",
    "Honduras": "HN",
    "Hungary": "HU",
    "Iceland": "IS",
    "Indonesia": "ID",
    "Ireland": "IE",
    "Israel": "IL",
    "Kosovo": "XK",
    "Kuwait": "KW",
    "Latvia": "LV",
    "Lithuania": "LT",
    "Luxembourg": "LU",
    "Malaysia": "MY",
    "Malta": "MT",
    "Martinique": "MQ",
    "Mexico": "MX",
    "Mongolia": "MN",
    "Montenegro": "ME",
    "Netherlands (Kingdom of the)": "NL",
    "New Zealand": "NZ",
    "Nicaragua": "NI",
    "Nigeria": "NG",
    "North Macedonia": "MK",
    "Panama": "PA",
    "Peru": "PE",
    "Poland": "PL",
    "Portugal": "PT",
    "Puerto Rico": "PR",
    "Qatar": "QA",
    "Republic of Korea (the)": "KR",
    "Republic of Moldova (the)": "MD",
    "Réunion": "RE",
    "Romania": "RO",
    "Saudi Arabia": "SA",
    "Serbia": "RS",
    "Singapore": "SG",
    "Slovakia": "SK",
    "Slovenia": "SI",
    "South Africa": "ZA",
    "Spain": "ES",
    "Sri Lanka": "LK",
    "Switzerland": "CH",
    "Thailand": "TH",
    "Türkiye": "TR",
    "Ukraine": "UA",
    "United Arab Emirates (the)": "AE",
    "United Kingdom of Great Britain and Northern Ireland (the)": "GB",
    "Uruguay": "UY",
}

EIA_ZONES = [
    zone
    for zone in ZONES_CONFIG
    if zone.startswith("US-") and "parsers" in ZONES_CONFIG[zone]
]