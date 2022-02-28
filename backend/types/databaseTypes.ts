interface databaseType {
    refresh_token: string
    dateadded: number
}

type databaseTypes = { [key: string]: databaseType }

export default databaseTypes
