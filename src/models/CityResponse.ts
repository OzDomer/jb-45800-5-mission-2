import type CityRecord from "./CityRecords"

export default interface City {
    result: {
        records: CityRecord[]
    }
}