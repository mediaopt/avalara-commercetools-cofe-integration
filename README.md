# Avalara Commercetools Frontend Integration Example

## Prerequisites
To test this code in a staging environment, you will need a [commercetools frontend](https://commercetools.com/products/frontend) studio, and a [commercetools merchant center](https://commercetools.com/products/business-tooling) with an admin scope dedicated [api client](https://docs.commercetools.com/getting-started/create-api-client). Save the api client access data into your frontend studio to connect your frontend to commercetools composable api. To set up a local staging environment, connected to your frontend studio, please follow [this](https://docs.commercetools.com/frontend-getting-started/developing-with-commercetools-frontend) guide. After that you will be able to test and play with the given code and see the changes instantly in your local environment.

Alternatively, there is already a deployed frontend instance of the source code, which can be accessed under the 'About' section of this repository. You can use the following registered customer user for your tests: 
- username: test@mail.de
- password:  12345678

## User guide
In this repository you can find an example of how to integrate the Avalara Commercetools Connector in the checkout area for a correct tax calculation and display. To learn more about the connector functionality, see [here](https://projects.mediaopt.de/projects/mopt-ecomqe/wiki/Commercetools_documentation) and [here](https://projects.mediaopt.de/projects/mopt-ecomqe/wiki/Avalara_user_manual).
Two things are fundamental for a successful integration of the connector functionality into your frontend application, which you can also identify directly in this example code:
- you have to extend the frontend Cart Mapper to the properties that contain tax relevant information, since it is where the Avalara connector is writing tax information to. Those are `taxedPrice` and `taxRate` for your line items and your shipping methods.You can also include cart's `taxedPrice` as well for easier calculations. Further, you can use this data for displaying calculated taxes to your customers after they have specified their shipping address and delivery method by directly accessing the frontend cart properties.
- if you wish to use address validation endpoint of the connector, e.g. for blocking a customer to make an order if Avalara could not validate his address, you have to implement a custom frontend endpoint into your frontend api hub. In the example code, it is implemented as `validateShippingAddress` method. To obtain the endpoint url, you have to utilize the commercetools composable api and fetch an extension url with key `avalara-commercetools-connector-cartUpdateExtension`. To this url, you have to append `/check-address`. The schema of the post request body to this endpoint looks like this: 
```
    {
        address: {
            line1?: string, 
            line2?: string, 
            line3?: string, 
            city?: string, 
            region?: string, 
            postalCode?: string,
            country?: string
        }
    }
```
The response will come as: 
```
    {
        valid?: boolean;
        address?: ValidatedAddressInfo[];
        errorMessages?: Error[];
        addressValidation?: boolean;
    }
```
If the address validation was deactivated in the connector mc-app, you will get no validation and a response `{ addressValidation: false }`. Otherwise, you will either get `valid=true` and and an array containing your verified and standartized address, or `valid=false` with corresponding error messages. You can utilize both valid addresses and error messages in your frontend application. 

Note that the Avalara credentials, needed to use with the address validation tool, are fetched by the connector automatically from the commercetools composable api. So you have to make sure they are present and working with help of the connector mc-app test connection tool. 

This code provides only a basic and non-compulsory example of the Avalara Commercetools Connector Frontend integration, and serves only for documentation and demonstration purposes. No responsibility for putting this code into production by a third-party will be undertaken by the code owners.
