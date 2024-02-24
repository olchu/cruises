export interface VodohodCabinsResponse {
    code:    number;
    message: string;
    result:  Result;
}

 interface Result {
    count:          number;
    limit:          number;
    offset:         number;
    orderBy:        string;
    orderDirection: string;
    data:           Datum[];
}

 interface Datum {
    id:           number;
    number:       string;
    availability: boolean;
    motorship:    number;
    bedConfigs:   BedConfig[];
    side:         Side;
    deck:         Class;
    class:        Class;
    minPrice?:    MinPrice;
}

 interface BedConfig {
    id:   number;
    name: BedConfigName;
}

 enum BedConfigName {
    ПоУмолчанию = "По умолчанию",
}

 interface Class {
    id:        number;
    name:      ClassName;
    meta_id:   number;
    meta_name: MetaName;
}

 enum MetaName {
    The1МестнаяСтандартNEW = "1-местная Стандарт NEW",
    The2ХМестнаяОднояруснаяСтандартNEW = "2-х местная одноярусная Стандарт NEW",
    The3ХМестнаяСтандартNEW = "3-х местная Стандарт NEW",
    The4ХМестнаяСтандартNEW = "4-х местная Стандарт NEW",
    Главная = "Главная",
    ЛюксNEW = "Люкс NEW",
    Нижняя = "Нижняя",
    Полулюкс2Местный = "Полулюкс 2-местный",
    ПолулюксNEW = "Полулюкс NEW",
    Солнечная = "Солнечная",
    Средняя = "Средняя",
    Шлюпочная = "Шлюпочная",
}

 enum ClassName {
    Главная = "Главная",
    Двухместная = "Двухместная",
    ЛюксЧетырехместный = "Люкс четырехместный",
    Нижняя = "Нижняя",
    Одноместная = "Одноместная",
    Полулюкс2Местный = "Полулюкс 2-местный",
    ПолулюксАТрехместный = "Полулюкс «А» трехместный",
    Солнечная = "Солнечная",
    Средняя = "Средняя",
    Трехместная = "Трехместная",
    ЧетырехместнаяДвухъярусная = "Четырехместная двухъярусная",
    Шлюпочная = "Шлюпочная",
}

 interface MinPrice {
    basePrice:          number;
    NDSType:            number;
    baseNDSValue:       number;
    discountedPrice:    number;
    discountedValue:    number;
    discountedNDSValue: number;
    personalPrice:      number;
    personalValue:      number;
    personalNDSValue:   number;
}

 enum Side {
    ЛевыйБорт = "Левый борт",
    ПравыйБорт = "Правый борт",
}
