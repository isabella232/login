import ScriptBuilder from "../../../src/PowerShell/Utilities/ScriptBuilder";
import Constants from "../../../src/PowerShell/Constants";

describe("Getting AzLogin PS script" , () => {
    const scheme = Constants.ServicePrincipal;
    let args: any = {
        servicePrincipalId: "service-principal-id",
        servicePrincipalKey: "service-principal-key",
        environment: "environment",
        scopeLevel: Constants.Subscription
    }

    test("PS script should not set context without passing subscriptionId", () => {
        const loginScript = new ScriptBuilder().getAzPSLoginScript(scheme, "tenant-id", args);
        expect(loginScript.includes("Set-AzContext -SubscriptionId")).toBeFalsy();
    });

    test("PS script should set context after passing subscriptionId", () => {
        args["subscriptionId"] = "subscription-id";
        const loginScript = new ScriptBuilder().getAzPSLoginScript(scheme, "tenant-id", args);
        expect(loginScript.includes("Set-AzContext -SubscriptionId")).toBeTruthy();
    });
});