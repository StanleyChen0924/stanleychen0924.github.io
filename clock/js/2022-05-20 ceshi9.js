const vm = new Vue({
  el: '#sum',
  data() {
    return {
      flag: [
        '零秒',
        '一秒',
        '二秒',
        '三秒',
        '四秒',
        '五秒',
        '六秒',
        '七秒',
        '八秒',
        '九秒',
        '十秒',
        '十一秒',
        '十二秒',
        '十三秒',
        '十四秒',
        '十五秒',
        '十六秒',
        '十七秒',
        '十八秒',
        '十九秒',
        '二十秒',
        '二十一秒',
        '二十二秒',
        '二十三秒',
        '二十四秒',
        '二十五秒',
        '二十六秒',
        '二十七秒',
        '二十八秒',
        '二十九秒',
        '三十秒',
        '三十一秒',
        '三十二秒',
        '三十三秒',
        '三十四秒',
        '三十五秒',
        '三十六秒',
        '三十七秒',
        '三十八秒',
        '三十九秒',
        '四十秒',
        '四十一秒',
        '四十二秒',
        '四十三秒',
        '四十四秒',
        '四十五秒',
        '四十六秒',
        '四十七秒',
        '四十八秒',
        '四十九秒',
        '五十秒',
        '五十一秒',
        '五十二秒',
        '五十三秒',
        '五十四秒',
        '五十五秒',
        '五十六秒',
        '五十七秒',
        '五十八秒',
        '五十九秒'
      ],
      flag_minute: [
        '零分',
        '一分',
        '二分',
        '三分',
        '四分',
        '五分',
        '六分',
        '七分',
        '八分',
        '九分',
        '十分',
        '十一分',
        '十二分',
        '十三分',
        '十四分',
        '十五分',
        '十六分',
        '十七分',
        '十八分',
        '十九分',
        '二十分',
        '二十一分',
        '二十二分',
        '二十三分',
        '二十四分',
        '二十五分',
        '二十六分',
        '二十七分',
        '二十八分',
        '二十九分',
        '三十分',
        '三十一分',
        '三十二分',
        '三十三分',
        '三十四分',
        '三十五分',
        '三十六分',
        '三十七分',
        '三十八分',
        '三十九分',
        '四十分',
        '四十一分',
        '四十二分',
        '四十三分',
        '四十四分',
        '四十五分',
        '四十六分',
        '四十七分',
        '四十八分',
        '四十九分',
        '五十分',
        '五十一分',
        '五十二分',
        '五十三分',
        '五十四分',
        '五十五分',
        '五十六分',
        '五十七分',
        '五十八分',
        '五十九分'
      ],
      flag_hour: [
        '十二時',
        '一時',
        '二時',
        '三時',
        '四時',
        '五時',
        '六時',
        '七時',
        '八時',
        '九時',
        '十時',
        '十一時'
      ],
      flag_mouth: [
        {
          name: '一月',
          flag: false
        },
        {
          name: '二月',
          flag: false
        },
        {
          name: '三月',
          flag: false
        },
        {
          name: '四月',
          flag: false
        },
        {
          name: '五月',
          flag: false
        },
        {
          name: '六月',
          flag: false
        },
        {
          name: '七月',
          flag: false
        },
        {
          name: '八月',
          flag: false
        },
        {
          name: '九月',
          flag: false
        },
        {
          name: '十月',
          flag: false
        },
        {
          name: '十一月',
          flag: false
        },
        {
          name: '十二月',
          flag: false
        }
      ],
      flag_solar: [
        {
          name: '立春',
          flag: false,
          msg:
            '公曆2月03-05日交節立春，二十四節氣之首，是春季的第一個節氣。 立春，意味著新的一個輪迴已開啟，乃萬物起始、一切更生之義也。 立，是“開始”之意;春，代表著溫暖、生長。 立春後陽氣開始上升，日照增加，風和日暖，意味著萬物閉藏的冬季已過去，開始進入生長的季節，萬物至此漸次復甦。'
        },
        {
          name: '雨水',
          flag: false,
          msg:
            '公曆2月18-20日交節雨水節氣標示著降雨開始，雨量漸增。 雨雨水和穀雨、小滿、小雪、大雪等節氣一樣，都是反映降水現象的節氣，是古代農耕文化對於節令的反映。 進入雨水節氣，我國北方陰寒未盡，一些地方仍下雪，尚未入春，仍是很冷;南方大多數地方則是春意盎然，一幅早春的景象。'
        },
        {
          name: '驚蟄',
          flag: false,
          msg:
            '公曆3月05-07日交節驚蟄的意思是天氣回暖，春雷始鳴，驚醒蟄伏於地下冬眠的昆蟲。 驚蟄“標誌著仲春卯月的開始。 作為全年氣溫回升最快的節氣，我國北方大部分地區平均氣溫已升至0°C以上。 南方沿江江南地區為8°C以上，而西南和華南已達10至15°C以上，早已是一派融融春光了，日照時數也有了明顯的增加。'
        },
        {
          name: '春分',
          flag: false,
          msg:
            '公曆3月20-22日交節春分時，太陽直射點在赤道上，此後太陽直射點繼續北移，故春分也稱“升分”。 古時又稱為“日中”、“日夜分”、“仲春之月”。 南北半球晝夜平分，這天以後太陽直射位置繼續由赤道向北半球推移，北半球開始晝長夜短。 春分的意義，一是指一天時間白天黑夜平分，各為12小時;二是古時以立春至立夏為春季，春分正當春季三個月之中，平分了春季。'
        },
        {
          name: '清明',
          flag: false,
          msg:
            '公曆4月04-06日交節“清明”的含義是氣候暖和，草木萌動，杏桃開花，處處給人以清新明朗、欣欣向榮的感覺。 此時氣候清爽溫暖，萬物「吐故納新」，草木始發新枝芽，萬物開始生長，大地呈現春和景明之象。'
        },
        {
          name: '穀雨',
          flag: false,
          msg:
            '公曆4月19-21日交節穀雨，是春季最後一個節氣，顧名思義也就是播谷降雨的意思。 在穀雨時節雨水會增多，大大有利於谷類農作物的生長。 由於雨穀雨，這時田中的秧苗初插、作物新種，最需要雨水的滋潤，所以說“春雨貴如油”。'
        },
        {
          name: '立夏',
          flag: false,
          msg:
            '公曆5月05-07日交節夏季的第一個節氣，表示盛夏時節的正式開始。 萬物至此皆長大，故名立夏也。 從此進入夏天，萬物生長旺盛。 習慣上把立夏當作是氣溫顯著升高，炎暑將臨，雷雨增多，農作物進入旺季生長的一個最重要節氣。'
        },
        {
          name: '小滿',
          flag: false,
          msg:
            '公曆5月20-22日交節“小滿”節氣，天氣漸漸由暖變熱，並且降水也會逐漸增多，小滿節氣意味著進入了大幅降水的雨季，雨水開始增多，往往會出現持續大範圍的強降水。 進入小滿節氣後，我國南方地區一般會降雨多、雨量大; 北方，小滿節氣期間降雨很少，氣溫上升很快，與南方的溫差進一步縮小。'
        },
        {
          name: '芒種',
          flag: false,
          msg:
            '公曆6月21-22日交節芒種，諧音“忙種”，芒種的“種”字，是指谷黍類作物播種的節令。 “芒種”到來預示著農民開始了忙碌的田間生活。 氣候特點：節雨量充沛，氣溫顯著升高。 農事：作物栽培。'
        },
        {
          name: '夏至',
          flag: false,
          msg:
            '公曆6月21-22日交節夏至這天，太陽直射地面的位置到達一年的最北端，幾乎直射北迴歸線，此時，北半球各地的白晝時間達到全年最長。 夏至是太陽的轉捩點，這天過後它將走“回頭路”，陽光直射點開始從北迴歸線向南移動，北半球白晝將會逐日減短。 同時，夏至到來後，夜空星象也逐漸變成夏季星空。'
        },
        {
          name: '小暑',
          flag: false,
          msg:
            '公曆7月06-08日交節小暑，是夏季的第五個節氣，表示盛夏正式開始。 暑，表示炎熱的意思，小暑為小熱，還不十分熱。 意指天氣開始炎熱，但還沒到最熱。 此時，已是初伏前後。 各地也進入雷暴最多的季節，常伴隨著大風、暴雨。'
        },
        {
          name: '大暑',
          flag: false,
          msg:
            '公曆7月22-24日交節大暑是一年中最熱的節氣，這時正值中伏前後，“濕熱交蒸”在此時到達頂點。 在我國很多地區，經常會出現攝氏40度的高溫天氣。 大暑期間為一年最熱時期，也是喜熱作物生長速度最快的時期。 這個時期氣溫最高，農作物生長最快，同時，很多地區的旱、澇、風災等各種氣象災害也最為頻繁。'
        },
        {
          name: '立秋',
          flag: false,
          msg:
            '公曆8月07-09日交節進入秋季，意味著降雨、風暴、濕度等，處於一年中的轉捩點，趨於下降或減少;在自然界，萬物開始從繁茂成長趨向蕭索成熟。 立秋並不代表酷熱天氣就此結束，初秋期間天氣仍然很熱。 按照「三伏」的推算方法，「立秋」這天往往還處在中伏期間，也就是說，酷暑並沒有過完，真正涼爽一般要到白露節氣之後。 酷熱與涼爽的分水嶺並不是在立秋節氣。'
        },
        {
          name: '處暑',
          flag: false,
          msg:
            '公曆8月22-24日交節“處”是終止的意思，處暑是表示炎熱的酷暑結束，這時三伏已過或近尾聲。 由於受短期回熱天氣影響，處暑過後仍有持續高溫，會感到悶熱，天氣由炎熱向悶熱轉變。 處暑節氣處在短期回熱天氣期內，真正涼爽一般要到白露前後。'
        },
        {
          name: '白露',
          flag: false,
          msg:
            '公曆9月07-09日交節白露是一個反映自然界氣溫變化的重要節令。 古人以四時配五行，秋屬金，金色白，故以白形容秋露。 白露前後，夏日殘留的暑氣逐漸消失，天地的陰氣上升擴散，天氣漸漸轉涼。 白露節氣基本結束了暑天的悶熱，是秋季由悶熱轉向涼爽的轉捩點。 白露過後，天高雲淡、氣爽風涼。'
        },
        {
          name: '秋分',
          flag: false,
          msg:
            '公曆9月22-24日交節秋分這一天同春分一樣，陽光幾乎直射赤道，晝夜幾乎相等。 從這一天起，陽光直射位置繼續由赤道向南半球推移，北半球開始晝短夜長，南半球相反。 秋分時節，我國大部分地區已經進入涼爽的秋季。'
        },
        {
          name: '寒露',
          flag: false,
          msg:
            '公曆10月08-09交節寒露是一個反映氣候變化特徵的節氣，寒露節氣後，晝漸短，夜漸長，日照減少，熱氣慢慢退去，寒氣漸生，晝夜的溫差較大，晨晚略感絲絲寒意。 古人將寒露作為寒氣漸生的表徵。 從氣候特點上看，寒露時節，南方秋意漸濃，氣爽風涼，少雨乾燥;北方廣大地區已從深秋進入或即將進入冬季。'
        },
        {
          name: '霜降',
          flag: false,
          msg:
            '公曆10月23-24交節霜降是秋季的最後一個節氣，是秋季到冬季的過渡。 霜降節氣特點是早晚天氣較冷、中午則比較熱，晝夜溫差大，秋燥明顯。 由於「霜」是天冷、晝夜溫差變化大的表現，故以「霜降」命名這個表示「氣溫驟降、晝夜溫差大」的節令。 霜降時節，萬物畢成，畢入於戌，陽下入地，陰氣始凝。 霜降過後，植物漸漸失去生機，大地一片蕭索，氣溫驟降、晝夜溫差大。 霜降節氣後，深秋景象明顯，冷空氣南下越來越頻繁。'
        },
        {
          name: '立冬',
          flag: false,
          msg:
            '公曆11月07-8日交節立冬是季節類節氣，表示自此進入了冬季，意味著風雨、乾濕、光照、氣溫等，處於轉捩點上，開始從秋季向冬季氣候過渡。 “秋收冬藏”，萬物在冬季閉藏，冬季是享受豐收、休養生息的季節。 白晝時間縮短，北半球獲得太陽的輻射量越來越少，但由於此時地表在下半年晝存的熱量還有一定的能量，所以還不很冷。'
        },
        {
          name: '小雪',
          flag: false,
          msg:
            '公曆11月22-23交節小雪和大雪、雨水、穀雨、小滿等節氣一樣，都是直接反映降水的節氣。 小雪節氣是一個氣候概念，它代表的是小雪節小雪節氣是寒潮和強冷空氣活動頻數較高的節氣。'
        },
        {
          name: '大雪',
          flag: false,
          msg:
            '公曆12月6-08日交節大雪是直接反映降水的節氣。 節氣大雪的到來，意味著天氣會越來越冷，降水量漸漸增多。 大雪節氣最常見的就是降溫、下雨或下雪。 大雪節氣是一個氣候概念，它代表的是大雪節氣期間的氣候特徵，即氣溫與降水量。'
        },
        {
          name: '冬至',
          flag: false,
          msg:
            '公曆12月21-23交節冬至標示著北半球的太陽高度最小，白晝時間最短，但是冬至日的溫度不是最低。 冬至日是北半球各地一年中白晝最短的一天，並且越往北白晝越短。 而冬至以後，陽光直射位置逐漸向北移動，北半球的白天就逐漸變長了。 天文學上把立冬作為冬季的開始，冬至作為寒冷氣候的開始。 冬至之前通常不會很冷，冬季的真正寒天是在冬至之後。'
        },
        {
          name: '小寒',
          flag: false,
          msg:
            '公曆1月05-07日交節小寒，標誌著寒冬正式開始。 冷氣積久而寒，小寒是天氣寒冷但還沒有到極點的意思。 它與大寒、小暑、大暑及處暑一樣，都是表示氣溫冷暖變化的節氣。 小寒的天氣特點是：天漸寒，尚未大冷。 俗話有講：「冷在三九」，由於隆冬「三九」也基本上處於該節氣之內，因此有「小寒勝大寒」之講法。'
        },
        {
          name: '大寒',
          flag: false,
          msg:
            '公曆1月20-21日交節大寒同小寒一樣，也是表示天氣寒冷程度的節氣。 在我國部分地區，大寒不如小寒冷，但在某些年份和沿海少數地方，全年最低汽溫仍然會出在大寒節氣內。 小寒、大寒是一年中雨水最少的時段。 大寒以後，立春接著到來，天氣漸暖。 至此地球繞太陽公轉了一週，完成了一個迴圈。'
        }
      ],
      Arrays: [],
      flag_data: [
        {
          name: '一號',
          flag: false
        },
        {
          name: ' 二號',
          flag: false
        },
        {
          name: '三號',
          flag: false
        },
        {
          name: ' 四號',
          flag: false
        },
        {
          name: '五號',
          flag: false
        },
        {
          name: '六號',
          flag: false
        },
        {
          name: '七號',
          flag: false
        },
        {
          name: '八號',
          flag: false
        },
        {
          name: '九號',
          flag: false
        },
        {
          name: ' 十號',
          flag: false
        },
        {
          name: '十一號',
          flag: false
        },
        {
          name: '  十二號',
          flag: false
        },
        {
          name: '   十三號',
          flag: false
        },
        {
          name: '    十四號',
          flag: false
        },
        {
          name: '   十五號',
          flag: false
        },
        {
          name: ' 十六號',
          flag: false
        },
        {
          name: '  十七號',
          flag: false
        },
        {
          name: '   十八號',
          flag: false
        },
        {
          name: '    十九號',
          flag: false
        },
        {
          name: '     二十號',
          flag: false
        },
        {
          name: '二十一號',
          flag: false
        },
        {
          name: ' 二十二號',
          flag: false
        },
        {
          name: '  二十三號',
          flag: false
        },
        {
          name: '   二十四號',
          flag: false
        },
        {
          name: '二十五號',
          flag: false
        },
        {
          name: ' 二十六號',
          flag: false
        },
        {
          name: ' 二十七號',
          flag: false
        },
        {
          name: '  二十八號',
          flag: false
        },
        {
          name: '   二十九號 ',
          flag: false
        },
        {
          name: '   三十號 ',
          flag: false
        },
        {
          name: '   三十一號 ',
          flag: false
        }
      ],
      flag_AP: [
        {
          name: '上午'
        },
        {
          name: '下午'
        }
      ],
      NllNumber: []
    }
  },
  methods: {
    showMsg: function(index) {
      var this_ = this
      var sum = this_.flag_solar
      var a = 0
      var b = 12
      // 處理後合格的字串
      var newObject
      // 確保拿到需要的字串
      var strings = sum[index].msg
      // 字串分割
      var arrayy = strings.split('')
      var length = arrayy.length
      // 獲取到的陣列（迴圈中）
      var arrayOne
      // 獲取陣列轉換的字串（帶','需要處理的）
      var stringOne = ''
      // 獲取字串並新增
      for (var i = 0; i < 10; i++) {
        arrayOne = arrayy.slice(a, b)
        // console.log(arrayOne.length)
        if (arrayOne.length !== 0) {
          stringOne = arrayOne.join()
          // console.log(stringOne)
          newObject = stringOne
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
            .replace(',', '')
          // 新增陣列元素
          this.Arrays.push(newObject)
        }
        // 第一列個數和別的列字數不一樣
        if (i === 0) {
          a += 12
          b += 20
        } else {
          a += 20
          b += 20
        }
        // if (this.Arrays[i] == 0) {
        //   this.NllNumber.push(i)
        // }
      }
      // console.log(this.NllNumber)
      // mmm = this.NllNumber
      // if (mmm !== undefined) {
      //   mmm.forEach(function(item, index) {
      //     document.getElementsByClassName('msg')[item].style.border = '0'
      //   })
      // }
      // console.log(mmm.length)
      // for (let j = 0; j < mmm.length; j++) {
      //   document.getElementsByClassName('msg')[mmm[0]].style.border = '0'
      // }
    },
    hideMsg: function() {
      this.Arrays = []
      this.NllNumber = []
    }
  }
})

// 秒數圈動作控制
var number = 0
//  window.onload =
function sell() {
  var data = new Date()
  var second = data.getSeconds() + 1
  number = second * -6
  document
    .getElementById('second')
    .setAttribute('style', '-webkit-transform:rotate' + '(' + number + 'deg)')

  var myVar = setInterval(function() {
    sell_one()
  }, 1000)
}

function sell_one() {
  document
    .getElementById('second')
    .setAttribute('style', '-webkit-transform:rotate' + '(' + number + 'deg)')
  number += -6
}
sell()

// 分數圈控制

// var number_minute = 0
// function minutes() {
//   var data = new Date()
//   var minute = data.getMinutes()
//   number_minute = minute * -6
//   document
//     .getElementById('minute')
//     .setAttribute(
//       'style',
//       'transform:rotate' + '(' + number_minute + 'deg)'
//     )
//   var myVar = setInterval(function() {
//     sell_two()
//   }, 1000)
// }

// function sell_two() {
//   document
//     .getElementById('minute')
//     .setAttribute(
//       'style',
//       'transform:rotate' + '(' + number_minute + 'deg)'
//     )
//   number_minute += -6
// }

// minutes()

var number_minute = 0
function minutes() {
  var myVar = setInterval(function() {
    sell_two()
  }, 1000)
}

function sell_two() {
  var data = new Date()
  var minute = data.getMinutes()
  number_minute = minute * -6
  document.getElementById('minute').style.webkitTransform =
    'rotate' + '(' + number_minute + 'deg)'
}
minutes()

// 小時控制
var number_hour = 0
function hours() {
  var myVar = setInterval(function() {
    sell_three()
  }, 1000)
}

function sell_three() {
  var data = new Date()
  var hour = data.getHours()
  // console.log(hour)
  number_hour = hour * -30
  document.getElementById('hour').style.webkitTransform =
    'rotate' + '(' + number_hour + 'deg)'
}
hours()

// 年分控制
function year() {
  var data = new Date()
  var year = data.getFullYear()
  document.getElementById('yearAll').innerHTML = year + '年'
}

year()

// 節氣控制
function solarAndMouth() {
  var data = new Date()
  var mouth = data.getMonth()
  var number_mouth = mouth * -30
  document.getElementById('mouth').style.webkitTransform =
    'rotate' + '(' + number_mouth + 'deg)'
  document.getElementById('solar').style.webkitTransform =
    'rotate' + '(' + number_mouth + 'deg)'
}
solarAndMouth()

// data控制
function dates() {
  var data = new Date()
  var date = data.getDate()
  var number_date = date * -11.25 + 11.25
  document.getElementById('data').style.webkitTransform =
    'rotate' + '(' + number_date + 'deg)'
}
dates()

// AP控制
function APS() {
  var data = new Date()
  var ap = data.getHours()
  if (ap > 12) {
    document.getElementById('AP').style.webkitTransform = 'rotate(180deg)'
  } else {
    document.getElementById('AP').style.webkitTransform = 'rotate(0deg)'
  }
}
APS()
