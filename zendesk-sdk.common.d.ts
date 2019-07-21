export interface AnonUserIdentity {
    name?: string;
    email?: string;
}
export interface RequestOptions {
    requestId?: string;
    requestSubject?: string;
    addDeviceInfo?: boolean;
    tags?: string[];
    files?: File[];
    customFields?: CustomField[];
    ticketForm?: {
        ticketFormId: string;
        customFields: CustomField[];
    };
}
export interface CustomField {
    id: string;
    value: string;
}
export interface ArticleOptions {
    contactUsButtonVisible?: boolean;
}
export interface HelpCenterOptions {
    articleOptions?: ArticleOptions;
    contactUsButtonVisible?: boolean;
    categoriesCollapsed?: boolean;
    conversationsMenu?: boolean;
}
export interface InitConfig {
    zendeskUrl: string;
    applicationId: string;
    clientId: string;
    userLocale?: string;
    identity?: AnonUserIdentity | string;
}
export interface IosThemeSimple {
    primaryColor: any;
}
