import path from "path"
import { fileURLToPath } from "url"
import CopyWebpackPlugin from "copy-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: "production",
  entry: {
    main: "./src/index.ts",
    src_worker_ts: "./src/worker.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.json$/,
        type: "json"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/img",
          to: "img",
          noErrorOnMissing: true
        }
      ]
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
}
