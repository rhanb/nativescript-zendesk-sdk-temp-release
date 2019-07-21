import { AnonUserIdentity, HelpCenterOptions, InitConfig, IosThemeSimple, ZendeskSdk as ZendeskSdkBase } from "./zendesk-sdk";
import { ArticleOptions, RequestOptions, CustomField } from "./zendesk-sdk.common";
export * from "./zendesk-sdk.common";
export declare class ZendeskSdk implements ZendeskSdkBase {
    static initialize(config: InitConfig): ZendeskSdk;
    static setUserLocale(locale: string): ZendeskSdk;
    static setAnonymousIdentity(anonUserIdentity?: AnonUserIdentity): ZendeskSdk;
    static setJwtIdentity(jwtUserIdentifier: string): ZendeskSdk;
    private static getHelpCenterUiConfigs;
    static showHelpCenter(options?: HelpCenterOptions, uiConfig?: any[]): void;
    static showHelpCenterForCategoryIds(categoryIds: number[], options?: HelpCenterOptions, uiConfig?: any[]): void;
    static showHelpCenterForSectionIds(sectionIds: number[], options?: HelpCenterOptions, uiConfig?: any[]): void;
    static showHelpCenterForLabelNames(labelNames: string[], options?: HelpCenterOptions, uiConfig?: any[]): void;
    static showArticle(articleId: string, options?: ArticleOptions, uiConfig?: any[]): void;
    static createRequest(options?: RequestOptions, uiConfig?: any[]): void;
    static showRequestList(): void;
    static setIosTheme(_theme: IosThemeSimple): ZendeskSdk;
    private static _requestUiConfig;
    private static getRequestUiConfigAsArray;
    private static _initHelpCenter;
    private static _initArticle;
    private static _initRequest;
    static createNativeCustomFields(customFields: CustomField[]): java.util.ArrayList<{}>;
}
