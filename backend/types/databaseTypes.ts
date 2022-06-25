interface databaseType {
    refresh_token: string
}

type databaseTypes = { [key: string]: databaseType }

export default databaseTypes
