
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills-legacy.CLC_3jHV.js","/cdn/shopifycloud/checkout-web/assets/c1/app-legacy.DMUP0xH6.js","/cdn/shopifycloud/checkout-web/assets/c1/dist-vendor-legacy.COB2TuzM.js","/cdn/shopifycloud/checkout-web/assets/c1/browser-legacy.D-mbBLzV.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-FullScreenBackground-legacy.BR2Ueu3l.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-unactionable-errors-legacy.DKiqgQff.js","/cdn/shopifycloud/checkout-web/assets/c1/actions-shop-discount-offer-legacy.CXnX0YEz.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-alternativePaymentCurrency-legacy.CmUtcOAw.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-shared-legacy.cPH_WkTM.js","/cdn/shopifycloud/checkout-web/assets/c1/utils-BusinessCustomerShippingAddressManager-legacy.CYiktfVu.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-shared-legacy.ZyidSiKO.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-usePostPurchase-legacy.GiioM4LC.js","/cdn/shopifycloud/checkout-web/assets/c1/images-flag-icon-legacy.Bfupgm8k.js","/cdn/shopifycloud/checkout-web/assets/c1/images-payment-icon-legacy.BbBFqdfu.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-it-legacy.vSOk5pdU.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage-legacy.CagmwLdR.js","/cdn/shopifycloud/checkout-web/assets/c1/Captcha-MarketsProDisclaimer-legacy.CcOoR0lM.js","/cdn/shopifycloud/checkout-web/assets/c1/Menu-CrossBorderConsolidation-legacy.BfVfGWct.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayButtonClassName-legacy.galZXCtm.js","/cdn/shopifycloud/checkout-web/assets/c1/icons-ShopPayLogo-legacy.CXATLzfZ.js","/cdn/shopifycloud/checkout-web/assets/c1/BuyWithPrimeChangeLink-VaultedPayment-legacy.C1eBzm1z.js","/cdn/shopifycloud/checkout-web/assets/c1/DeliveryMacros-ShippingGroupsSummaryLine-legacy.mGMYDj_9.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandisePreviewThumbnail-StackedMerchandisePreview-legacy.CjUnVxEI.js","/cdn/shopifycloud/checkout-web/assets/c1/Map-PickupPointCarrierLogo-legacy.D3KId5X3.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-legacy.53T10g2A.js","/cdn/shopifycloud/checkout-web/assets/c1/PostPurchaseShouldRender-LocalizationExtensionField-legacy.DyrMUkjX.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-useShowShopPayOptin-legacy.BdgvMxSM.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-ShopPayOptInDisclaimer-legacy.CXIh5-6l.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-RememberMeDescriptionText-legacy.DUyStjNg.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-MobileOrderSummary-legacy.DNRxpIwH.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-OrderEditVaultedDelivery-legacy.D-9eC8sE.js","/cdn/shopifycloud/checkout-web/assets/c1/captcha-SeparatePaymentsNotice-legacy.DFMXlNm7.js","/cdn/shopifycloud/checkout-web/assets/c1/types-useHasOrdersFromMultipleShops-legacy.kT9KIr7a.js","/cdn/shopifycloud/checkout-web/assets/c1/shopPaySessionTokenStorage-Page-legacy.lQb6fXvJ.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-PaymentButtons-legacy.CpTqA3BA.js","/cdn/shopifycloud/checkout-web/assets/c1/icons-OffsitePaymentFailed-legacy.C62V35T8.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList-legacy.Boqp4GMb.js","/cdn/shopifycloud/checkout-web/assets/c1/redemption-useShopCashCheckoutEligibility-legacy.D7CliWtz.js","/cdn/shopifycloud/checkout-web/assets/c1/negotiated-ShipmentBreakdown-legacy.Cfyhog-h.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-MerchandiseModal-legacy.CRozBK5c.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-shipping-options-legacy.CwAvMucC.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-DutyOptions-legacy.BMDq-TAD.js","/cdn/shopifycloud/checkout-web/assets/c1/DeliveryInstructionsFooter-ShippingMethodSelector-legacy.DqZSdfJL.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-SubscriptionPriceBreakdown-legacy.DdWybAOO.js"];
      var styles = [];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  