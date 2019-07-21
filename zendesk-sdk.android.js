"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("tns-core-modules/ui/frame");
var ZendeskSdk = (function () {
    function ZendeskSdk() {
    }
    ZendeskSdk.initialize = function (config) {
        zendesk.core.Zendesk.INSTANCE.init(frame_1.topmost().android.activity, config.zendeskUrl, config.applicationId, config.clientId);
        if (!config.identity) {
            ZendeskSdk.setAnonymousIdentity();
        }
        else if (typeof config.identity === "object") {
            ZendeskSdk.setAnonymousIdentity(config.identity);
        }
        else if (typeof config.identity === "string") {
            ZendeskSdk.setJwtIdentity(config.identity);
        }
        zendesk.support.Support.INSTANCE.init(zendesk.core.Zendesk.INSTANCE);
        if (config.userLocale) {
            ZendeskSdk.setUserLocale(config.userLocale);
        }
        return ZendeskSdk;
    };
    ZendeskSdk.setUserLocale = function (locale) {
        if (zendesk.support.Support.INSTANCE) {
            zendesk.support.Support.INSTANCE.setHelpCenterLocaleOverride(new java.util.Locale(locale));
        }
        return ZendeskSdk;
    };
    ZendeskSdk.setAnonymousIdentity = function (anonUserIdentity) {
        if (anonUserIdentity === void 0) { anonUserIdentity = {}; }
        var anonymousIdentityBuilder = new zendesk.core.AnonymousIdentity.Builder();
        if (anonUserIdentity.name) {
            anonymousIdentityBuilder.withNameIdentifier(anonUserIdentity.name);
        }
        if (anonUserIdentity.email) {
            anonymousIdentityBuilder.withEmailIdentifier(anonUserIdentity.email);
        }
        zendesk.core.Zendesk.INSTANCE.setIdentity(anonymousIdentityBuilder.build());
        return ZendeskSdk;
    };
    ZendeskSdk.setJwtIdentity = function (jwtUserIdentifier) {
        zendesk.core.Zendesk.INSTANCE.setIdentity(new zendesk.core.JwtIdentity(jwtUserIdentifier));
        return ZendeskSdk;
    };
    ZendeskSdk.getHelpCenterUiConfigs = function (options, uiConfig) {
        if (options === void 0) { options = {}; }
        if (uiConfig === void 0) { uiConfig = []; }
        if (options.articleOptions) {
            uiConfig.push(this._initArticle(options.articleOptions).config());
        }
        return this.getRequestUiConfigAsArray(uiConfig);
    };
    ZendeskSdk.showHelpCenter = function (options, uiConfig) {
        if (options === void 0) { options = {}; }
        if (uiConfig === void 0) { uiConfig = []; }
        this._initHelpCenter(options).show(frame_1.topmost().android.activity, this.getHelpCenterUiConfigs(options, uiConfig));
    };
    ZendeskSdk.showHelpCenterForCategoryIds = function (categoryIds, options, uiConfig) {
        if (options === void 0) { options = {}; }
        if (uiConfig === void 0) { uiConfig = []; }
        this._initHelpCenter(options)
            .withArticlesForCategoryIds(categoryIds)
            .show(frame_1.topmost().android.activity, this.getHelpCenterUiConfigs(options, uiConfig));
    };
    ZendeskSdk.showHelpCenterForSectionIds = function (sectionIds, options, uiConfig) {
        if (options === void 0) { options = {}; }
        if (uiConfig === void 0) { uiConfig = []; }
        this._initHelpCenter(options)
            .withArticlesForSectionIds(sectionIds)
            .show(frame_1.topmost().android.activity, this.getHelpCenterUiConfigs(options, uiConfig));
    };
    ZendeskSdk.showHelpCenterForLabelNames = function (labelNames, options, uiConfig) {
        if (options === void 0) { options = {}; }
        if (uiConfig === void 0) { uiConfig = []; }
        this._initHelpCenter(options)
            .withLabelNames(labelNames)
            .show(frame_1.topmost().android.activity, this.getHelpCenterUiConfigs(options, uiConfig));
    };
    ZendeskSdk.showArticle = function (articleId, options, uiConfig) {
        if (options === void 0) { options = {}; }
        if (uiConfig === void 0) { uiConfig = []; }
        this._initArticle(options, articleId).show(frame_1.topmost().android.activity, this.getRequestUiConfigAsArray(uiConfig));
    };
    ZendeskSdk.createRequest = function (options, uiConfig) {
        if (options === void 0) { options = {}; }
        if (uiConfig === void 0) { uiConfig = []; }
        this._initRequest(options).show(frame_1.topmost().android.activity, this.getRequestUiConfigAsArray(uiConfig));
    };
    ZendeskSdk.showRequestList = function () {
        zendesk.support.requestlist.RequestListActivity.builder().show(frame_1.topmost().android.activity, this.getRequestUiConfigAsArray());
    };
    ZendeskSdk.setIosTheme = function (_theme) {
        return ZendeskSdk;
    };
    ZendeskSdk.getRequestUiConfigAsArray = function (uiConfig) {
        if (uiConfig === void 0) { uiConfig = []; }
        var requestUiConfig = uiConfig.length > 0 ? uiConfig : [ZendeskSdk._requestUiConfig];
        return new java.util.ArrayList(java.util.Arrays.asList(requestUiConfig));
    };
    ZendeskSdk._initHelpCenter = function (options) {
        return zendesk.support.guide.HelpCenterActivity.builder()
            .withContactUsButtonVisible(!!options.contactUsButtonVisible
            ? options.contactUsButtonVisible
            : false)
            .withCategoriesCollapsed(!!options.categoriesCollapsed ? options.categoriesCollapsed : false)
            .withShowConversationsMenuButton(!!options.conversationsMenu ? options.conversationsMenu : false);
    };
    ZendeskSdk._initArticle = function (options, articleId) {
        var articleBuilder = articleId
            ? zendesk.support.guide.ViewArticleActivity.builder(parseInt(articleId))
            : zendesk.support.guide.ViewArticleActivity.builder();
        return articleBuilder.withContactUsButtonVisible(!!options.contactUsButtonVisible ? options.contactUsButtonVisible : false);
    };
    ZendeskSdk._initRequest = function (options) {
        var requestBuilder = zendesk.support.request.RequestActivity.builder();
        if (!!options.requestId) {
            requestBuilder = requestBuilder.withRequestId(options.requestId);
        }
        if (!!options.requestSubject) {
            requestBuilder = requestBuilder.withRequestSubject(options.requestSubject);
        }
        if (!!options.tags && options.tags.length > 0) {
            requestBuilder = requestBuilder.withTags(new java.util.ArrayList(java.util.Arrays.asList(options.tags)));
        }
        if (!!options.customFields && options.customFields.length > 0) {
            requestBuilder = requestBuilder.withCustomFields(this.createNativeCustomFields(options.customFields));
        }
        if (!!options.files && options.files.length > 0) {
            requestBuilder = requestBuilder.withFiles(new java.util.ArrayList(java.util.Arrays.asList(options.files)));
        }
        if (options.ticketForm &&
            options.ticketForm.ticketFormId &&
            options.ticketForm.customFields &&
            options.ticketForm.customFields.length > 0) {
            requestBuilder = requestBuilder.withTicketForm(new java.lang.Long(options.ticketForm.ticketFormId), this.createNativeCustomFields(options.ticketForm.customFields));
        }
        return requestBuilder;
    };
    ZendeskSdk.createNativeCustomFields = function (customFields) {
        return new java.util.ArrayList(java.util.Arrays.asList(customFields.map(function (customField) {
            return new zendesk.support.CustomField(new java.lang.Long(customField.id), customField.value);
        })));
    };
    ZendeskSdk._requestUiConfig = null;
    return ZendeskSdk;
}());
exports.ZendeskSdk = ZendeskSdk;
//# sourceMappingURL=zendesk-sdk.android.js.map