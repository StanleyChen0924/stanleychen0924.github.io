###pip install PyMySQL
import configparser
import os
import sys
import pymysql
import time

# Version 1.0.0.0 2026-08-19, Modified by Stanley
# Modified type_param & 0x4:
# 更正功能為搜尋所有站別狀態資料
# Added type_param & 0x400: 查詢產品版本

# Version 1.0.0.0 2026-08-12, Modified by Stanley
# Modified type_param & 0x100:
# 更正語法錯誤 

# Version 1.0.0.0 2026-08-12, Modified by Jason
# Added 0x200 寫入註冊表時間紀錄
# 修改type_param = int(raw_param, 0),十六進位（例如 0x01），則使用 int() 轉換，否則直接轉換為整數


###type_param
##type 0x01 check orgMAC BeforStation = true
##type 0x02 check orgMAC ThisStation = false
##type 0x04 check CMAC = false
##type 0x08 Insert CARD of PASS test
##type 0x10 Insert CARD of FAIL test
##type 0x20 Update CARD
##type 0x40 Insert LOG

##INSERT資料指令
##python "PyMySQL.py" 10 0011e0123457
##python "PyMySQL.py" 16 0011e0123457

##更新資料指令
##python "PyMySQL.py" 51 0011e0123458 ,CMAC=003044123456,CSN=123456789012

def clean_msg(text):
    # 這是最強悍的過濾方式：強制轉 ASCII 並忽略所有特殊符號
    # 適合用在不支援 Unicode 的舊系統環境
    if isinstance(text, str):
        return text.encode('ascii', 'ignore').decode('ascii')
    return text


def get_config_path():
    if getattr(sys, "frozen", False):
        application_dir = os.path.dirname(os.path.abspath(sys.executable))
    else:
        application_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(application_dir, "MySQLConfig.ini")


def load_config():
    config_path = get_config_path()
    config = configparser.ConfigParser(strict=False, inline_comment_prefixes='//')

    if not os.path.exists(config_path):
        config['setting'] = {
            'Test_count': '3',
            'Debug_FLAG': '0',
            'MySQL_FLAG': '1',
            'MySQL_InsertFlag': '0',
            'MySQL_BeforStation': 'and STA1 > 100',
            'TableDetailStr': 'STA2',
            'MySQL_ServerIP': '169.254.10.2',
            'MySQL_username': 'U94003',
            'MySQL_Password': 'U94003',
            'MySQL_DB': 'LITEON',
            'MySQL_TYPE': 'CARD',
            'MySQL_Job': 'PUA00K5',
            'MySQL_ModelName': 'BIW-LA00',
            'MySQL_Operator': 'U93039',
            'MySQL_Station': '1006-1001',
            'MySQL_CPNumber': '4-3-1'
        }
        try:
            with open(config_path, 'w', encoding='utf-8') as config_file:
                config.write(config_file)
        except OSError as error:
            raise OSError(f"無法建立 MySQLConfig.ini: {error}") from error

    try:
        if not config.read(config_path, encoding='utf-8'):
            raise OSError(f"無法讀取設定檔: {config_path}")
        return config
    except (configparser.Error, OSError) as error:
        raise OSError(f"MySQLConfig.ini 設定檔錯誤: {error}") from error


def main():
    full_string = " ".join(sys.argv[3:])

    # winreg 為 Windows 獨有模組，先進行平台檢查
    if sys.platform != "win32":
        raise OSError("此註冊表方法僅支援 Windows 作業系統！")

    import winreg

    # 定義註冊表路徑（在當前使用者機碼下建立您專屬的軟體資料夾）
    REG_PATH = r"Software\MyApp\TimeTracker"
    VALUE_NAME = "LastRunTime"
    current_time = time.time()

    from datetime import datetime
    # 必須先定義變數
    now = datetime.now()
    # 獲取現在時間
    formatted_time = now.strftime("%Y-%m-%d %H:%M:%S")
    ##print(f"{formatted_time}")

    # 1. 檢查參數是否存在 (sys.argv[0] 是檔名，[1] 是第一個參數)
    if (len(sys.argv) < 3):
        print("錯誤：請輸入 type SN 參數。用法：python PyMySQL.py <TYPE> <SN_NUMBER> <LOG_Str or Update_Str>")
        return

    type_Execute = 0
    # 取得命令列輸入的 TYPE
    raw_param = sys.argv[1]
    # 如果參數以傳入的形式是十六進位（例如 0x01），則使用 int() 轉換，否則直接轉換為整數
    type_param = int(raw_param, 0)

    
    # 取得命令列輸入的 SN
    sn_param = sys.argv[2]
    
    # 取得命令列輸入的 SELECT item
    if (len(sys.argv) >= 4):
    	SELECT_item = sys.argv[3]
    


##    if (len(sys.argv) >= 4):
##        CMAC = sys.argv[3]

##    if (len(sys.argv) >= 5):
##        LOG_Str = sys.argv[4]

##    if (len(sys.argv) >= 6):
##        Update_Str = sys.argv[5]

    # 1. 初始化讀取器
    config = load_config()
    # 2. 抓取 [setting] 區塊內的資訊
    try:
        Debug_FLAG = config.getint('setting', 'Debug_FLAG') # 轉為整數
        Test_count = config.getint('setting', 'Test_count') # 轉為整數
        MySQL_ServerIP = config['setting']['MySQL_ServerIP']
        MySQL_username = config['setting']['MySQL_username']
        MySQL_Password = config['setting']['MySQL_Password']
        MySQL_DB = config['setting']['MySQL_DB']
        MySQL_TYPE = config['setting']['MySQL_TYPE']
        
        # 額外的邏輯參數
        MySQL_InsertFlag = config.getint('setting', 'MySQL_InsertFlag') # 轉為整數
        MySQL_BeforStation = config['setting']['MySQL_BeforStation']
        MySQL_Job = config['setting']['MySQL_Job']
        MySQL_ModelName = config['setting']['MySQL_ModelName']
        MySQL_Operator = config['setting']['MySQL_Operator']
        MySQL_Station = config['setting']['MySQL_Station']
        TableDetailStr = config['setting']['TableDetailStr']
    
        ##print(f"成功載入設定，準備連線至: {MySQL_ServerIP}")

    except KeyError as e:
        print(f"❌ INI 檔案格式錯誤，找不到參數: {e}")
        print(f"   請確保 MySQLConfig.ini 中 [setting] 區塊包含所有必要的設定")
        sys.exit(1)

    # 3. 資料庫連線設定
    try:
        ##print(f"嘗試連接到 MySQL 伺服器: {MySQL_ServerIP}")
        db = pymysql.connect(
            host=MySQL_ServerIP,
            user=MySQL_username,
            password=MySQL_Password,
            database=MySQL_DB,
            charset='utf8',
            cursorclass=pymysql.cursors.DictCursor
        )
        ##print(f"✅ 連接成功")
        
        with db.cursor() as cursor:
            # 4. 使用 %s 作為佔位符，並將參數傳入 execute
            # 💡 這樣可以自動處理跳脫字元，防止 SQL 注入
            ##type 0x01 check iSN BeforStation = true
            if type_param & 0x1:
                sql = f"SELECT {TableDetailStr} FROM CARD WHERE iSN = '{sn_param}'{MySQL_BeforStation}"
                if Debug_FLAG==1:
                	print(f"Sql Command= {sql}")
                cursor.execute(sql)
                db.commit()
                result = cursor.fetchone()
                if result is not None:
                    ##print(clean_msg(f"✅ 找到 SN [{sn_param}] 的資料: {result}"))
                    ##print(f"PASS")
                    type_Execute += 0x1
                else:
                    print(clean_msg(f"❌ 找不到 SN 為 [{sn_param}] 的紀錄"))
                    ##print(f"FAIL")
                    return
            
            ##type 0x02 check iSN ThisStation = false
            if type_param & 0x2:
                ##if (MySQL_InsertFlag == 1):
                sql = f"SELECT {TableDetailStr} FROM {MySQL_TYPE} WHERE iSN = '{sn_param}'"
                ##else:
                ##    sql = f"SELECT {TableDetailStr} FROM {MySQL_TYPE} WHERE iSN = '{sn_param}' and {TableDetailStr} = 0"

                if Debug_FLAG==1:
                	print(f"Sql Command= {sql}")
                cursor.execute(sql)
                db.commit()
                result = cursor.fetchone()
                ##print(clean_msg(f"✅ 找到 SN [{sn_param}] 的資料: {result}"))

                if result and result[f'{TableDetailStr}'] > Test_count:
                    print(clean_msg(f"❌ 找不到 SN 為 [{sn_param}] 的資料: {result}"))
                    ##print(f"FAIL")
                    return
                else:
                    ##print(clean_msg(f"✅ 找到 SN [{sn_param}] 的資料: {result}"))
                    ##print(f"PASS")
                    type_Execute += 0x2
 

            ##python PyMySQL.py 4 230411797 isn CMAC,CSN
            if type_param & 0x4:
                where_column = SELECT_item
                select_columns = ",".join(sys.argv[4:]) or where_column
                sql = f"SELECT {select_columns} FROM {MySQL_TYPE} WHERE {where_column} = %s"
                cursor.execute(sql, (sn_param,))
                ##db.commit()
                result = cursor.fetchone()
                if Debug_FLAG==1:
                	print(f"Sql Command= {sql}")
                if result is not None:
                    if select_columns.strip() == "*":
                        values = [str(value) for value in result.values()]
                    else:
                        values = [str(result[column.strip()]) for column in select_columns.split(",")]
                    print(",".join(values))
                    type_Execute += 0x4
                else:
                    print(clean_msg(f"❌ 找不到 {where_column} 為 [{sn_param}] 的紀錄"))
                    ##print(f"FAIL")
                    return

            ##type 0x08 Insert CARD of PASS test
            if type_param & 0x8:
                sql = f"INSERT INTO {MySQL_TYPE} SET iSN='{sn_param}',{TableDetailStr}=100 ON DUPLICATE KEY UPDATE {TableDetailStr} = {TableDetailStr} + 100"
                if Debug_FLAG==1:
                	print(f"Sql Command= {sql}")
                cursor.execute(sql)
                db.commit()
                
                #檢查是否執行成功 (INSERT 通常看 rowcount)
                if cursor.rowcount > 0:
                    ##print(clean_msg(f"✅ 找到 SN [{sn_param}] 的資料: {result}"))
                    ##print(f"PASS")
                    type_Execute += 0x8
                else:
                    print(clean_msg(f"❌ 找不到 SN 為 [{sn_param}] 的紀錄"))
                    ##print(f"FAIL")
                    return

            ##type 0x10 Insert CARD of FAIL test
            if type_param & 0x10:
                sql = f"INSERT INTO {MySQL_TYPE} SET iSN='{sn_param}',{TableDetailStr}=1 ON DUPLICATE KEY UPDATE {TableDetailStr} = {TableDetailStr} + 1"
                if Debug_FLAG==1:
                	print(f"Sql Command= {sql}")
                cursor.execute(sql)
                db.commit()
                
                #檢查是否執行成功 (INSERT 通常看 rowcount)
                if cursor.rowcount > 0:
                    ##print(clean_msg(f"✅ 找到 SN [{sn_param}] 的資料: {result}"))
                    ##print(f"PASS")
                    type_Execute += 0x10
                else:
                    print(clean_msg(f"❌ 找不到 SN 為 [{sn_param}] 的紀錄"))
                    ##print(f"FAIL")
                    return

            ##type 0x10 Update CARD +100
            if type_param & 0x20:
                # 範例：欄位A = 1, 欄位B = 'Finished'
                ##update_fields = f"{TableDetailStr} = 1, status = 'PASS', update_time = NOW()"
                # 2. 組合 UPDATE 語法：UPDATE 表格 SET 欄位=值 WHERE 條件
                sql = f"UPDATE {MySQL_TYPE} SET {TableDetailStr}={TableDetailStr}+100 {full_string} WHERE iSN = '{sn_param}'"
                if Debug_FLAG==1:
                	print(f"Sql Command= {sql}")
                cursor.execute(sql)
                db.commit()
                #檢查是否執行成功 (INSERT 通常看 rowcount)
                if cursor.rowcount > 0:
                    ##print(clean_msg(f"✅ 找到 SN [{sn_param}] 的資料: {result}"))
                    ##print(f"PASS")
                    type_Execute += 0x20
                else:
                    ##print(clean_msg(f"❌ 找不到 SN 為 [{sn_param}] 的紀錄"))
                    ##print(f"FAIL")
                    return

            ##type 0x20 Insert LOG
            ##執行Command如下
            ##python PyMySQL.py 64 0011e0123456 ,StartTime='2026-04-27 11:00:11',StopTime='2026-04-27 11:03:01',throughTime=100,log='test OK',errorCode='SWF04'
            
            
            if type_param & 0x40:
                # 1. 嘗試讀取註冊表內的舊時間
                try:
                    # 開啟機碼（唯讀模式）
                    with winreg.OpenKey(
                        winreg.HKEY_CURRENT_USER, REG_PATH, 0, winreg.KEY_READ
                    ) as key:
                        # 讀取數值，winreg.QueryValueEx 會回傳一個 tuple (數值, 型態)
                        value, reg_type = winreg.QueryValueEx(key, VALUE_NAME)
                        last_time = float(value)

                except FileNotFoundError:
                    # 找不到路徑或數值名稱，代表是第一次執行
                    pass

                # 2. 進行時間運算
                if last_time is not None:
                    elapsed_seconds = current_time - last_time
                    throughTime = int(elapsed_seconds)
                    #print(f"🔑 從 Windows 註冊表讀取成功！")
                    print(f"距離上次執行已經過去了：{int(elapsed_seconds)} 秒")
                else:
                    print("🆕 首次執行程式，正在初始化註冊表路徑...")

                sql = (f"INSERT INTO {TableDetailStr} SET "
                        f"iSN = '{sn_param}',"
                        f"JobNum = '{MySQL_Job}',"
                        f"ModelName = '{MySQL_ModelName}',"
                        f"operator = '{MySQL_Operator}',"
                        f"Station = '{MySQL_Station}',"
                        f"StopTime = '{formatted_time}',"
                        f"throughTime = {throughTime}"
                        f"{full_string}"
                )
                if Debug_FLAG==1:
                	print(f"Sql Command= {sql}")
                cursor.execute(sql)
                db.commit()
                #檢查是否執行成功 (INSERT 通常看 rowcount)
                if cursor.rowcount > 0:
                    ##print(clean_msg(f"✅ 找到 SN [{sn_param}] 的資料: {result}"))
                    ##print(f"PASS")
                    type_Execute += 0x40
                else:
                    ##print(clean_msg(f"❌ 找不到 SN 為 [{sn_param}] 的紀錄"))
                    ##print(f"FAIL")
                    return
                    
            ##type 0x10 Update CARD iSN            
            ##執行Command如下
            ##python PyMySQL.py 128 0011e0123456 ,StartTime='2026-04-27 11:00:11',StopTime='2026-04-27 11:03:01',throughTime=100,log='test OK',errorCode='SWF04'
            if type_param & 0x80:
                # 範例：欄位A = 1, 欄位B = 'Finished'
                ##update_fields = f"{TableDetailStr} = 1, status = 'PASS', update_time = NOW()"
                # 2. 組合 UPDATE 語法：UPDATE 表格 SET 欄位=值 WHERE 條件
                ## sql = f"UPDATE {MySQL_TYPE} SET {TableDetailStr}={TableDetailStr} {full_string} WHERE iSN = '{sn_param}'"
                sql = f"UPDATE {MySQL_TYPE} SET {full_string} WHERE iSN = '{sn_param}'"
                if Debug_FLAG==1:
                	print(f"Sql Command= {sql}")
                cursor.execute(sql)
                db.commit()
                #檢查是否執行成功 (INSERT 通常看 rowcount)
                if cursor.rowcount >= 0:
                    ##print(clean_msg(f"✅ 找到 SN [{sn_param}] 的資料: {result}"))
                    ##print(f"PASS")
                    type_Execute += 0x80
                else:
                    print(clean_msg(f"❌ 找不到 SN 為 [{cursor.rowcount}] 的紀錄"))
                    ##print(f"FAIL")
                    return

            ##type 0x100 SELECT CARD CSN         
            ##執行Command如下
            ##python PyMySQL.py 256 250202710            
            if type_param & 0x100:
                sql = f"SELECT iSN FROM {MySQL_TYPE} WHERE CSN = '{sn_param}'"
                ##print(f"Sql Command= {sql}")
                cursor.execute(sql)
                ##db.commit()
                result = cursor.fetchone()
                if result is not None:
                    ##print(clean_msg(f"✅ 找到 SN [{sn_param}] 的資料: {result}"))
                    ##print(f"PASS")
                    print(f"{result['iSN']}")
                    if Debug_FLAG==1:
                    	print(f"Sql Command= {sql}")
                    type_Execute += 0x100
                else:
                    print(clean_msg(f"❌ 找不到 CSN 為 [{cursor.rowcount}] 的紀錄"))
                    ##print(f"FAIL")
                    return

            ##python PyMySQL.py 512 250202710            
            if type_param & 0x200:
                last_time = None
                # 3. 將當前最新時間寫入註冊表
                # CreateKeyEx 如果發現路徑不存在會自動建立，若已存在則會直接開啟
                with winreg.CreateKeyEx(
                    winreg.HKEY_CURRENT_USER, REG_PATH, 0, winreg.KEY_WRITE
                ) as key:
                    # 將時間轉為字串存入（REG_SZ），亦可轉為整數存入（REG_DWORD）
                    winreg.SetValueEx(key, VALUE_NAME, 0, winreg.REG_SZ, str(current_time))
                type_Execute += 0x200
                
            ##python PyMySQL.py 1024 SA-AN-220-RT STA1         
            if type_param & 0x400:
                version_column = f"{full_string}"
                sql = f"SELECT `{version_column}` FROM testprogramversion WHERE ProgramName LIKE %s"
                cursor.execute(sql, (sn_param,))
                ##db.commit()
                result = cursor.fetchone()
                if result is not None:                    
                    print(f"{result[version_column]}")
                    if Debug_FLAG==1:
                    	print(f"Sql Command= {sql}")
                    type_Execute += 0x400
                else:
                    print(clean_msg(f"❌ 找不到 {full_string} 為 [{cursor.rowcount}] 的紀錄"))
                    ##print(f"FAIL")
                    return
            
                          
    except pymysql.err.OperationalError as e:
        print(f"❌ MySQL 連接錯誤 (OperationalError): {e}")
        print(f"   請檢查:")
        print(f"   - 伺服器地址: {MySQL_ServerIP}")
        print(f"   - 使用者名稱: {MySQL_username}")
        print(f"   - 資料庫名稱: {MySQL_DB}")
        sys.exit(1)
    except pymysql.err.DatabaseError as e:
        print(f"❌ 資料庫錯誤 (DatabaseError): {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ 發生連線錯誤: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

    finally:

        if 'db' in locals():
            db.close()
        if (type_Execute == type_param):
            print(f"PASS")
        else:
            print(f"FAIL")

if __name__ == "__main__":
    main()
