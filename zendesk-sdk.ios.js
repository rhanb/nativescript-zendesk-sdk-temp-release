"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("tns-core-modules/color/color");
var frame_1 = require("tns-core-modules/ui/frame");
var ZendeskSdk = (function () {
    function ZendeskSdk() {
    }
    ZendeskSdk.initialize = function (config) {
        ZDKZendesk.initializeWithAppIdClientIdZendeskUrl(config.applicationId, config.clientId, config.zendeskUrl);
        if (config.identity == null) {
            ZendeskSdk.setAnonymousIdentity();
        }
        else if (typeof config.identity === "object") {
            ZendeskSdk.setAnonymousIdentity(config.identity);
        }
        else if (typeof config.identity === "string") {
            ZendeskSdk.setJwtIdentity(config.identity);
        }
        ZDKSupportUI.initializeWithZendesk(ZDKZendesk.instance);
        if (config.userLocale) {
            ZendeskSdk.setUserLocale(config.userLocale);
        }
        return ZendeskSdk;
    };
    ZendeskSdk.setUserLocale = function (locale) {
        if (ZDKSupport.instance) {
            ZDKSupport.instance.helpCenterLocaleOverride = locale;
        }
        return ZendeskSdk;
    };
    ZendeskSdk.setAnonymousIdentity = function (anonUserIdentity) {
        if (anonUserIdentity === void 0) { anonUserIdentity = {}; }
        ZDKZendesk.instance.setIdentity(ZDKObjCAnonymous.alloc().initWithNameEmail(anonUserIdentity.name, anonUserIdentity.email));
        return ZendeskSdk;
    };
    ZendeskSdk.setJwtIdentity = function (jwtUserIdentifier) {
        ZDKZendesk.instance.setIdentity(ZDKObjCJwt.alloc().initWithToken(jwtUserIdentifier));
        return ZendeskSdk;
    };
    ZendeskSdk.showHelpCenter = function (options) {
        if (options === void 0) { options = {}; }
        var vc = ZDKHelpCenterUi.buildHelpCenterOverviewWithConfigs(NSArray.arrayWithObject(ZendeskSdk._initHelpCenterConfiguration(options)));
        ZendeskSdk._showView(vc);
    };
    ZendeskSdk.showHelpCenterForCategoryIds = function (categoryIds, options) {
        if (options === void 0) { options = {}; }
        var hcUiConfig = ZendeskSdk._initHelpCenterConfiguration(options);
        hcUiConfig.groupType = 2;
        var nsArray = NSMutableArray.array();
        for (var _i = 0, categoryIds_1 = categoryIds; _i < categoryIds_1.length; _i++) {
            var e = categoryIds_1[_i];
            nsArray.addObject(e);
        }
        hcUiConfig.groupIds = nsArray;
        var vc = ZDKHelpCenterUi.buildHelpCenterOverviewWithConfigs(NSArray.arrayWithObject(hcUiConfig));
        ZendeskSdk._showView(vc);
    };
    ZendeskSdk.showHelpCenterForLabelNames = function (labelNames, options) {
        if (options === void 0) { options = {}; }
        var hcUiConfig = ZendeskSdk._initHelpCenterConfiguration(options);
        var nsArray = NSMutableArray.array();
        for (var _i = 0, labelNames_1 = labelNames; _i < labelNames_1.length; _i++) {
            var e = labelNames_1[_i];
            nsArray.addObject(e);
        }
        hcUiConfig.labels = nsArray;
        var vc = ZDKHelpCenterUi.buildHelpCenterOverviewWithConfigs(NSArray.arrayWithObject(hcUiConfig));
        ZendeskSdk._showView(vc);
    };
    ZendeskSdk.showHelpCenterForSectionIds = function (sectionIds, options) {
        if (options === void 0) { options = {}; }
        var hcUiConfig = ZendeskSdk._initHelpCenterConfiguration(options);
        hcUiConfig.groupType = 1;
        var nsArray = NSMutableArray.array();
        for (var _i = 0, sectionIds_1 = sectionIds; _i < sectionIds_1.length; _i++) {
            var e = sectionIds_1[_i];
            nsArray.addObject(e);
        }
        hcUiConfig.groupIds = nsArray;
        var vc = ZDKHelpCenterUi.buildHelpCenterOverviewWithConfigs(NSArray.arrayWithObject(hcUiConfig));
        ZendeskSdk._showView(vc);
    };
    ZendeskSdk.showArticle = function (articleId) {
        var vc = ZDKHelpCenterUi.buildHelpCenterArticleWithArticleIdAndConfigs(articleId, NSArray.arrayWithObject(ZDKArticleUiConfiguration.new()));
        frame_1.topmost().ios.controller.pushViewControllerAnimated(vc, true);
    };
    ZendeskSdk.createRequest = function (requestOptions) {
        var requestUiConfig = ZDKRequestUiConfiguration.new();
        if (!!requestOptions.requestSubject) {
            requestUiConfig.subject = requestOptions.requestSubject;
        }
        if (!!requestOptions.tags && requestOptions.tags.length > 0) {
            var nsArray = NSMutableArray.array();
            for (var _i = 0, _a = requestOptions.tags; _i < _a.length; _i++) {
                var tag = _a[_i];
                nsArray.addObject(tag);
            }
            requestUiConfig.tags = nsArray;
        }
        if (!!requestOptions.customFields &&
            requestOptions.customFields.length > 0) {
            var nsArray = NSMutableArray.array();
            for (var _b = 0, _c = requestOptions.customFields; _b < _c.length; _b++) {
                var field = _c[_b];
                var nativeCustomField = ZDKCustomField.new().initWithFieldIdAndValue(parseInt(field.id), field.value);
                nsArray.addObject(nativeCustomField);
            }
        }
        var requestUiConfigArray = NSMutableArray.array();
        requestUiConfigArray.addObject(requestUiConfig);
        var requestViewController = !!requestOptions.requestId
            ? ZDKRequestUi.buildRequestUiWithRequestIdConfigurations(requestOptions.requestId, requestUiConfigArray)
            : ZDKRequestUi.buildRequestUiWith(requestUiConfigArray);
        frame_1.topmost().ios.controller.pushViewControllerAnimated(requestViewController, true);
    };
    ZendeskSdk.showRequestList = function () {
        frame_1.topmost().ios.controller.pushViewControllerAnimated(ZDKRequestUi.buildRequestList(), true);
    };
    ZendeskSdk.setIosTheme = function (theme) {
        if (theme.primaryColor) {
            ZDKTheme.currentTheme.primaryColor = new color_1.Color(theme.primaryColor).ios;
        }
        return ZendeskSdk;
    };
    ZendeskSdk._initHelpCenterConfiguration = function (options) {
        var helpCenterConfig = ZDKHelpCenterUiConfiguration.new();
        helpCenterConfig.hideContactSupport = !!options.contactUsButtonVisible
            ? !options.contactUsButtonVisible
            : true;
        return helpCenterConfig;
    };
    ZendeskSdk._showView = function (viewController) {
        frame_1.topmost().ios.controller.pushViewControllerAnimated(viewController);
    };
    ZendeskSdk._requestUiConfig = null;
    return ZendeskSdk;
}());
exports.ZendeskSdk = ZendeskSdk;
//# sourceMappingURL=zendesk-sdk.ios.js.map