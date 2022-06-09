import path from "path";
import { Plugin } from "vite";
import handleUpload, { ConfigType } from "./core/index";

export default function pluginConfig(config: ConfigType): Plugin {
  let outDirFinal: string;

  return {
    name: "vite-plugin-arms-upload-sourcemap",
    apply: "build",
    configResolved(resolvedConfig) {
      // 获取打包文件夹路径
      const { root } = resolvedConfig;
      const { outDir, assetsDir } = resolvedConfig.build;
      outDirFinal = path.resolve(root, outDir, assetsDir);
    },
    closeBundle() {
      handleUpload(config, outDirFinal);
    }
  };
}
