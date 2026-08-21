# PyMySQL.py 工作指令文檔
**版本**: 1.0.0.0  
**最後更新**: 2026-08-21  
**製作者**: Stanley

---

## 目錄
1. [概述](#概述)
2. [系統需求](#系統需求)
3. [配置文件](#配置文件)
4. [類型代碼參考](#類型代碼參考)
5. [執行範例](#執行範例)

---

## 概述
此腳本用於與 MySQL 資料庫進行交互，管理測試數據、卡片狀態和產品信息。支持多種操作類型，通過位運算(&)組合多個操作。

**基本語法**:
```bash
python PyMySQL.py <TYPE> <SN_NUMBER> [LOG_Str or Update_Str]
```

- `<TYPE>`: 十六進位類型代碼（例如 0x01, 0x02 等），支持組合使用
- `<SN_NUMBER>`: 產品序列號
- `[LOG_Str or Update_Str]`: 可選參數，用於日誌或更新操作

---

## 系統需求
- Python 3.x
- PyMySQL 模塊：`pip install PyMySQL`
- Windows 作業系統（需要存取 Windows 註冊表）
- MySQLConfig.ini 配置文件

---

## 配置文件
**文件名**: `MySQLConfig.ini`

**必要設定項** (`[setting]` 區塊):
```ini
[setting]
Debug_FLAG = 1                          ; 0=關閉偵錯, 1=開啟偵錯
Test_count = 3                          ; 最大測試次數限制
MySQL_ServerIP = 192.168.1.100         ; MySQL 伺服器 IP
MySQL_username = root                  ; 資料庫用戶名
MySQL_Password = password              ; 資料庫密碼
MySQL_DB = testdb                      ; 資料庫名稱
MySQL_TYPE = CARD                      ; 卡片表名稱
MySQL_InsertFlag = 1                   ; 1=允許插入, 0=不允許
MySQL_BeforStation = AND Station = 'STA1'  ; 前站篩選條件
MySQL_Job = Job001                     ; 工作編號
MySQL_ModelName = ModelA               ; 型號名稱
MySQL_Operator = Operator01            ; 操作員
MySQL_Station = Station01              ; 工作站
TableDetailStr = STA2                  ; 當殘測試站名稱
```

---

## 類型代碼參考

## 1. 通用命令格式

```powershell
python PyMySQL.py <TYPE> <SN_NUMBER> [<UPDATE_OR_LOG_FIELDS>]
```

參數說明：

| 參數 | 說明 |
|---|---|
| `TYPE` | 功能旗標。可輸入十進位，例如 `10`。 |
| `SN_NUMBER` | CARD 的 iSN。執行 `0x04` 時，此欄位改作 CMAC 查詢值。 |
| `UPDATE_OR_LOG_FIELDS` | `0x20`、`0x40`、`0x80` 使用的 SQL 欄位內容；沒有需要時可省略。 |

`TYPE` 採 bitwise flag 設計，可以將多個功能相加。例如：

```text
0x01 + 0x02 + 0x10 + 0x20 = 51(十進制)
```

因此下列兩種寫法等效：

```powershell
python PyMySQL.py 51 0011e0123458 ,CMAC='003044123456',CSN='123456789012'
```

## 2. TYPE 功能說明

| TYPE | 十進位 | 功能 | 使用的 SN / 欄位 | 成功條件與動作 |
|---|---:|---|---|---|
| `0x01` | 1 | 檢查 iSN 是否存在於前站資料 | `SN_NUMBER` | 查詢 `CARD` 表，並套用 `MySQL_BeforStation` 設定條件；找到資料才通過。 |
| `0x02` | 2 | 檢查 iSN 的本站狀態 | `SN_NUMBER` | 查詢 `MySQL_TYPE` 表的 iSN 與 `TableDetailStr`；當該欄位大於 6 時失敗，否則通過。 |
| `0x04` | 4 | 根據指定欄位名,查詢CARD信息。 |
| `0x08` | 8 | 寫入 CARD PASS 測試結果 | `SN_NUMBER` | 新增 iSN 並將 `TableDetailStr` 設為 100；若已存在則增加 100。 |
| `0x10` | 16 | 寫入 CARD FAIL 測試結果 | `SN_NUMBER` | 新增 iSN 並將 `TableDetailStr` 設為 1；若已存在則增加 1。 |
| `0x20` | 32 | 更新 CARD 測試結果 | `SN_NUMBER`、更新欄位 | 對符合 iSN 的資料，將 `TableDetailStr` 增加 100，並附加其他更新欄位。 |
| `0x40` | 64 | 寫入測試 LOG | `SN_NUMBER`、LOG 欄位 | 寫入 iSN、JobNum、ModelName、operator、Station、StopTime、throughTime 及附加 LOG 欄位。 |
| `0x80` | 128 | 依 iSN 更新 CARD 欄位 | `SN_NUMBER`、更新欄位 | 執行 `UPDATE ... SET <UPDATE_FIELDS> WHERE iSN=...`。 |
| `0x100` | 256 | 查詢 CARD 的 CSN | `SN_NUMBER` | 查詢符合 iSN 的 CSN，成功時會在畫面輸出 CSN。 |
| `0x200` | 512 | 寫入本次執行時間 | 不使用 SN 查詢 | 將目前 Unix timestamp 寫入目前使用者註冊表 `HKCU\Software\MyApp\TimeTracker\LastRunTime`。 |
| `0x400` | 1024 | 查詢產品版本 | PyMySQL.exe 0x400 SA-AN-220-RT STA1


-------------------0x01------------------------------------

### **0x01 (TYPE_CHECK_SN_BEFOR_STATION) - 檢查前站序列號**
**功能**: 檢查 SN 是否存在於前站數據中

**SQL 邏輯**:
```sql
SELECT {TableDetailStr} FROM CARD WHERE iSN = '{sn_param}' AND Station = 'BeforStation'
```

**執行命令**:
```bash
python PyMySQL.py 0x01 230411797 
```

**成功條件**:
- 找到 SN 記錄
- 返回 PASS

**失敗條件**:
- SN 記錄不存在
- 返回 FAIL 並終止

-------------------0x02------------------------------------

### **0x02 (TYPE_CHECK_SN_THIS_STATION) - 檢查當前站序列號**
**功能**: 檢查 SN 在當前站的測試計數是否超過閾值

**SQL 邏輯**:
```sql
SELECT {TableDetailStr} FROM {MySQL_TYPE} WHERE iSN = '{sn_param}'
```

**驗證條件**:
- 如果 `{TableDetailStr}` > `Test_count`，判斷為 FAIL
- 否則為 PASS

**執行命令**:
```bash
python PyMySQL.py 0x02 230411797 
```

**應用場景**: 防止重複測試或測試計數超限

-------------------0x04------------------------------------

### **0x04 (TYPE_QUERY_BY_FIELD) - 查詢指定欄位**
**功能**: 根據指定欄位名和值查詢CARD信息

**SQL 邏輯**:
```sql
SELECT {select_columns} FROM {MySQL_TYPE} WHERE {where_column} = '{sn_param}'
```

**執行命令**:
```bash
python PyMySQL.py 0x04 230411797 iSN *                      ,由 iSN  查詢 CARD 所有狀態
python PyMySQL.py 0x04 230411797 iSN CMAC,CSN               ,由 iSN  查詢 CARD 的 CMAC,CSN
python PyMySQL.py 0x04 14:3F:C3:90:6F:C3 CMAC *             ,由 CMAC 查詢 CARD 所有狀態
python PyMySQL.py 0x04 14:3F:C3:90:6F:C CMAC iSN,CSN        ,由 CMAC 查詢 CARD 的 iSN,CSN
python PyMySQL.py 0x04 ST23150361020841A0 CSN *             ,由 CSN  查詢 CARD 所有狀態
python PyMySQL.py 0x04 ST23150361020841A0 CSN CMAC,iSN      ,由 CSN  查詢 CARD 的 CMAC,iSN```

**參數說明**:
- `{sn_param}`: 查詢值
- `{full_string}`: 欄位名稱（第 3 個及以後的參數拼接）
- `{select_columns} : 查詢的欄位名稱

**輸出**: 完整的記錄詳情

-------------------0x08------------------------------------

### **0x08 (TYPE_INSERT_PASS) - 插入通過測試記錄**
**功能**: 為通過測試的卡片插入或更新計數（加 100）

**SQL 邏輯**:
```sql
INSERT INTO {MySQL_TYPE} SET iSN='{sn_param}',{TableDetailStr}=100 
ON DUPLICATE KEY UPDATE {TableDetailStr} = {TableDetailStr} + 100
```

**執行命令**:
```bash
python PyMySQL.py 0x08 230411797
```

**預期結果**:
- 新插入：計數 = 100
- 已存在：計數 += 100

-------------------0x10------------------------------------

### **0x10 (TYPE_INSERT_FAIL) - 插入失敗測試記錄**
**功能**: 為失敗測試的卡片插入或更新計數（加 1）

**SQL 邏輯**:
```sql
INSERT INTO {MySQL_TYPE} SET iSN='{sn_param}',{TableDetailStr}=1 
ON DUPLICATE KEY UPDATE {TableDetailStr} = {TableDetailStr} + 1
```

**執行命令**:
```bash
python PyMySQL.py 0x10 230411797
```

**預期結果**:
- 新插入：計數 = 1
- 已存在：計數 += 1

-------------------0x20------------------------------------

### **0x20 (TYPE_UPDATE_CARD) - 更新卡片計數**
**功能**: 增加指定卡片的計數欄位（加 100）

**SQL 邏輯**:
```sql
UPDATE {MySQL_TYPE} SET {TableDetailStr}={TableDetailStr}+100 {full_string} 
WHERE iSN = '{sn_param}'
```

**執行命令**:
```bash
python PyMySQL.py 0x20 230411797 ,CMAC=003044123456,CSN=123456789012
```

**參數說明**:
- 第 3 個參數：額外的條件/更新欄位（可選）

-------------------0x40------------------------------------

### **0x40 (TYPE_INSERT_LOG) - 插入操作日誌**
**功能**: 記錄測試過程日誌，包括耗時、操作人等

**SQL 邏輯**:
```sql
INSERT INTO {TableDetailStr} SET 
  iSN = '{sn_param}',
  JobNum = '{MySQL_Job}',
  ModelName = '{MySQL_ModelName}',
  operator = '{MySQL_Operator}',
  Station = '{MySQL_Station}',
  StopTime = '{formatted_time}',
  throughTime = {throughTime}
  {full_string}
```

**執行命令**:
```bash
python PyMySQL.py 0x40 230411797 ,StartTime='2026-04-27 11:00:11',StopTime='2026-04-27 11:03:01',log='TESTLOG.txt',DATA='Vol=12.1,T=25.4,da=xxxx'
```

**自動記錄**:
- 當前時間戳
- Windows 註冊表中的上次執行時間
- 耗時計算（throughTime）

**Windows 註冊表位置**:
```
HKEY_CURRENT_USER\Software\MyApp\TimeTracker
```

-------------------0x80------------------------------------

### **0x80 (TYPE_UPDATE_CARD_FULL) - 完整更新卡片**
**功能**: 更新卡片的任意欄位（完全自定義 SET 子句）

**SQL 邏輯**:
```sql
UPDATE {MySQL_TYPE} SET {full_string} WHERE iSN = '{sn_param}'
```

**執行命令**:
```bash
python PyMySQL.py 0x80 230411797 ,status='PASS',update_time=NOW(),note='Updated'
```

**參數說明**:
- 第 3 個及以後參數為完整的 SQL SET 子句

-------------------0x100------------------------------------

### **0x100 (TYPE_SELECT_ISN_BY_CSN) - 根據 CSN 查詢 iSN**
**功能**: 通過 CSN（卡片序列號）查詢對應的 iSN

**SQL 邏輯**:
```sql
SELECT iSN FROM {MySQL_TYPE} WHERE CSN = '{sn_param}'
```

**執行命令**:
```bash
python PyMySQL.py 0x100 ST23150361020841A0
```

**輸出**: 對應的 iSN 值

-------------------0x200------------------------------------

### **0x200 (TYPE_UPDATE_REGISTRY) - 更新 Windows 註冊表**
**功能**: 記錄程式執行時間至 Windows 註冊表

**操作**:
- 寫入當前時間戳至：`HKEY_CURRENT_USER\Software\MyApp\TimeTracker`
- 登錄檔值名稱：`LastRunTime`

**執行命令**:
```bash
python PyMySQL.py 0x200 250202710
```

**用途**: 與 0x40 配合用於計算執行間隔

-------------------0x400------------------------------------

### **0x400 (TYPE_SELECT_VERSION) - 查詢產品版本**
**功能**: 從 testprogramversion 表查詢指定程式版本

**SQL 邏輯**:
```sql
SELECT `{full_string}_Version` FROM testprogramversion 
WHERE ProgramName LIKE '{sn_param}%'
```

**執行命令**:
```bash
python PyMySQL.py 0x400 SA-AN-220-RT STA1_Version
```

**參數說明**:
- `{sn_param}`: 程式名稱（模糊匹配）
- `{full_string}`: 版本欄位前綴

**輸出**: 版本號

-------------------END--------------------------------------



## 執行範例

### 範例 1：完整的測試流程
```bash
# 1. 檢查前站是否有此 SN
python PyMySQL.py 0x01 230411797

# 2. 檢查當前站計數
python PyMySQL.py 0x02 230411797

# 3. 記錄開始時間至註冊表
python PyMySQL.py 0x200 230411797

# 4. 測試通過 - 插入通過記錄
python PyMySQL.py 0x08 230411797

# 5. 記錄測試日誌
python PyMySQL.py 0x40 0011e0123457 ,log='test completed successfully'
```

### 範例 2：組合類型執行（使用位運算）
```bash
# 同時執行多個操作：0x01 + 0x02 + 0x08 = 0x0B
python PyMySQL.py 0x0B 230411797

# 執行流程：
# 1. 檢查前站 (0x01)
# 2. 檢查當前站 (0x02)
# 3. 若都通過，插入通過記錄 (0x08)
```

### 範例 3：更新和日誌
```bash
# 更新卡片並記錄日誌
python PyMySQL.py 0x54 0011e0123457 ,CMAC=003044123456
# 0x54 = 0x40 (日誌) + 0x10 (FAIL計數) + 0x04 (查詢)
```

### 範例 4：版本查詢
```bash
python PyMySQL.py 0x400 SA-AN-220-RT STA1
# 查詢 testprogramversion 表中 STA1_Version 欄位
```

---

## 錯誤處理

### 常見錯誤和解決方案

| 錯誤信息 | 原因 | 解決方案 |
|---------|------|--------|
| `找不到 MySQLConfig.ini 設定檔` | 配置文件不存在 | 確保 MySQLConfig.ini 在工作目錄中 |
| `INI 檔案格式錯誤` | 缺少必要的配置項 | 檢查 [setting] 區塊是否包含所有必要參數 |
| `MySQL 連接錯誤 (OperationalError)` | 資料庫連接失敗 | 檢查 IP、用戶名、密碼、資料庫名稱 |
| `此註冊表方法僅支援 Windows 作業系統` | 非 Windows 系統 | 此腳本僅在 Windows 上運行 |
| `FAIL` | 執行條件不符 | 檢查對應類型代碼的執行條件 |

---

## 偵錯模式

設置 `Debug_FLAG = 1` 可開啟偵錯模式，輸出：
- 完整的 SQL 命令
- 資料庫查詢結果
- 執行狀態

```ini
[setting]
Debug_FLAG = 1  # 1=開啟, 0=關閉
```

---

## 版本歷史

| 版本 | 日期 | 修改內容 |
|------|------|--------|
| 1.0.0.0 | 2026-08-21 | 修正 0x04 查詢語法 |
| 1.0.0.0 | 2026-08-19 | 新增 0x400 版本查詢功能 |
| 1.0.0.0 | 2026-08-12 | 修正 0x100 查詢語法；新增 0x200 註冊表時間紀錄 |
| 1.0.0.0 | 2026-08-12 | 新增 0x01~0x80 基本功能 |

---

## 注意事項

1. **SQL 注入防護**: 大多數操作已使用參數化 SQL（0x400 使用了 %s 佔位符）
2. **字符編碼**: 使用 UTF-8 編碼，支持繁體中文
3. **ASCII 淨化**: `clean_msg()` 函數會移除所有非 ASCII 字符用於舊系統相容
4. **時間戳**: 使用浮點型存儲 Unix timestamp
5. **權限**: 需要 Windows 註冊表寫入權限（0x200、0x40）

---

**如有問題或建議，請聯繫技術支援**
