export default function checkEnv(...envVars: string[]) {
    envVars.forEach(name => {
        // only check undefined because the env var might be set to empty string on purpose
        if (process.env[name] === undefined) {
            throw `MISSING ENV VAR ${name}`
        }
    })
}
