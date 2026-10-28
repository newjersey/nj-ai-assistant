/**
 * Azure OpenAI configuration interface
 */
export interface AzureOptions {
  azureOpenAIApiKey?: string;
  azureOpenAIApiInstanceName?: string;
  azureOpenAIApiDeploymentName?: string;
  azureOpenAIApiVersion?: string;
  azureOpenAIBasePath?: string;
}
<<<<<<< HEAD

/**
 * Client with azure property for setting deployment name
 */
export interface GenericClient {
  azure: {
    azureOpenAIApiDeploymentName?: string;
  };
}
=======
>>>>>>> upstream/main
