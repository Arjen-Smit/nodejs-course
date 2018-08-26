/*
 * Create and export configuration variables
 *
 */

// Container for all the environments.
const environments = {};

// Staging (default environment.
environments.staging = {
    port: {
        http: 3000,
        https: 3001,
    },
    envName: 'staging',
    hashingSecret: 'ThisIsMyStagingSecret',
};

// Production environment.
environments.production = {
    port: {
        http: 5000,
        https: 5001,
    },
    envName: 'production',
    hashingSecret: 'ThisIsMyProductionSecret',
};

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module.
module.exports = environmentToExport;
