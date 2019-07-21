import { AnonUserIdentity, InitConfig, RequestOptions, HelpCenterOptions, IosThemeSimple, ZendeskSdk as ZendeskSdkBase } from "./zendesk-sdk";
export * from "./zendesk-sdk.common";
export declare class ZendeskSdk implements ZendeskSdkBase {
    static initialize(config: InitConfig): ZendeskSdk;
    static setUserLocale(locale: string): ZendeskSdk;
    static setAnonymousIdentity(anonUserIdentity?: AnonUserIdentity): ZendeskSdk;
    static setJwtIdentity(jwtUserIdentifier: string): ZendeskSdk;
    static showHelpCenter(options?: HelpCenterOptions): void;
    static showHelpCenterForCategoryIds(categoryIds: Array<number>, options?: HelpCenterOptions): void;
    static showHelpCenterForLabelNames(labelNames: Array<string>, options?: HelpCenterOptions): void;
    static showHelpCenterForSectionIds(sectionIds: Array<number>, options?: HelpCenterOptions): void;
    static showArticle(articleId: string): void;
    static createRequest(requestOptions: RequestOptions): void;
    static showRequestList(): void;
    static setIosTheme(theme: IosThemeSimple): ZendeskSdk;
    private static _requestUiConfig;
    private static _initHelpCenterConfiguration;
    private static _showView;
    private constructor();
}
