# Avalara Commercetools Frontend Integration Example

In this repository you can find an example how to integrate the Avalara Commercetools Connector in the checkout area for a correct tax calculation and display. To learn more about the connector functionality, see [here](https://projects.mediaopt.de/projects/mopt-ecomqe/wiki/Commercetools_documentation) and [here](https://projects.mediaopt.de/projects/mopt-ecomqe/wiki/Avalara_user_manual).
Two things are fundamental for a successful integration of the connector functionality into your frontend application, which you can also identify directly in this example code:
- you have to extend the frontend Cart Mapper to the properties that contain tax relevant information, since it is where the Avalara connector is writing tax information to. 

Those are `taxedPrice` and `taxedRate` for your line items and your shipping methods.You can also include cart's `taxedPrice` as well for easier calculations. Further, you can use this data for displaying calculated taxes to your customers after they have specified their shipping address and delivery method by directly accessing the frontend cart properties.

- if you wish to use address validation endpoint of the connector, e.g. for blocking a customer to make an order if Avalara could not validate his address, you have to implement a custom frontend endpoint into your frontend api hub. 

In the example code, it is implemented as `validateShippingAddress` method. To obtain the endpoint url, you have to utilize the commercetools composable api and fetch an extension url with key `avalara-connector-cartUpdateExtension`. To this url, you have to append `/check-address`.

Note that this url is protected from unauthorized calls with a [json web token](https://jwt.io/) validation. To successfully configure and pass such a validation, you need to generate an API Key that will be used for signing and verifying the json web token. On the frontend application side, you can extend the commercetools frontend studio project settings with an additional key-value pair. On the service application side, you have a `FRONTEND_API_KEY` variable. Generate an API Key and store it both for your service and your frontend application. With this key, you have to extend the `getConfig` method of your frontend repository project configuration to this key as well, and utilize it subsequently in the frontend backend `BaseApi`. Then you can use it for signing the json webtoken based on your request body within `validateShippingAddress` method, and store it in the request `Authorization` header as `Bearer ${token}`. The service side logic is taken care of by the connector, since you specified the `FRONTEND_API_KEY` variable. For the implementation reference, see the repository code.

The schema of the post request body to this endpoint looks like this: 
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

Note that the Avalara credentials, needed to use with the address validation tool, are fetched by the connector automatically as the secured configuration of the `service` application. So you have to make sure they are working with help of the connector mc-app test connection tool. 

This code provides only a basic and non-compulsory example of the Avalara Commercetools Connector Frontend integration, and serves only for documentation and demonstration purposes. No responsibility for putting this code into production by a third-party will be undertaken by the code owners.
