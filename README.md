# 校園傳說 Online（v0.6.0 真正骨骼 3D 校園人物測試版）

原創校園 MMORPG 網頁原型，參考經典校園 MMORPG 的視覺方向，使用原創設定與可合法使用的第三方模型素材；不包含《亂 Online》原作模型、貼圖、程式或商標素材。

## v0.6.0 更新
- 接入真正的 GLB／glTF 骨骼人物，不再只依賴程序化幾何人物。
- 男性角色使用 Schoolboy，女性角色使用 Schoolgirl；兩者均來自 Gobkit Free Character Pack Vol.1，採 CC0 1.0 授權。
- 使用 Three.js GLTFLoader 載入模型，SkeletonUtils.clone 複製骨架，支援本機與其他在線玩家。
- 接入模型內建 Idle、Walk、Run、Attack 等動畫（實際使用模型所提供的動畫名稱）。
- 四大職業共用男女校園人物基底，並依職業附加武器識別。
- 外部模型載入失敗時會退回程序化人物，避免遊戲無法進入。
- 保留第三人稱鏡頭、手機方向鍵、四大職業及既有玩法。

## 素材與授權
- Schoolboy：`https://gobkit.com/freebies/human019/Schoolboy.glb`
- Schoolgirl：`https://gobkit.com/freebies/human019/Schoolgirl.glb`
- 素材來源：Gobkit Free Character Pack Vol.1。
- 授權：CC0 1.0（依素材清單標示，可自由使用）。
- 模型由外部網址即時載入；首次載入需要網路連線。若來源服務暫時無法連線，會使用本機程序化人物備援。

## 執行
需要 Node.js 18 或更新版本。在專案根目錄執行：

```bash
npm install
npm start
```

開啟 StackBlitz 提供的 Web Preview。

## 目前限制
- 目前使用的是 CC0 低多邊形校園人物作為第一階段骨骼模型，不是《亂 Online》原版人物，也尚未達到經典遊戲的高精度人物質感。
- 男女模型已接入；四大職業目前共用男女基礎模型，職業武器為初步識別，尚未完成四職業專屬服裝、專屬動作及高品質裝備。
- 模型與動畫需在 Android 手機及 StackBlitz 實際測試，尚未宣稱完成裝置端驗證。
- 多人同步目前只包含在線名單與位置；戰鬥、怪物、掉落、存檔仍在用戶端模擬，尚未達正式 MMORPG 伺服器規格。
- Three.js、GLTFLoader 與 Socket.IO 瀏覽器模組由 CDN 載入，首次遊玩需要網路。
