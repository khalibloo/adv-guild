/** @type {import('next').NextConfig} */

const antdLess = require("next-plugin-antd-less");
const pwa = require("next-pwa");
const withPlugins = require("next-compose-plugins");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const { withSentryConfig } = require("@sentry/nextjs");

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const themeOverride = lessToJS(fs.readFileSync("./src/styles/theme.less", "utf8"));

module.exports = withSentryConfig(
  withPlugins([antdLess, pwa], {
    reactStrictMode: true,
    // use modifyVars or lessVarsFilePath or both
    // lessVarsFilePath: "",
    modifyVars: { ...themeOverride },

    i18n: {
      // These are all the locales you want to support in
      // your application
      locales: ["en-US"],
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: "en-US",
    },

    images: {
      domains: ["www.gravatar.com"],
    },

    // other configs here...
    webpack(config) {
      // svg import support
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      return config;
    },

    pwa: {
      dest: "public",
      disable: process.env.NODE_ENV === "development",
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
  }),
  SentryWebpackPluginOptions
);
