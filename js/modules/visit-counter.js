import { Storage } from './storage.js';

// 实现访问统计功能
export function initVisitCounter() {
  const counters = document.querySelectorAll('.visit-counter');
  if (!counters.length) return;

  const VISIT_KEY = 'total_visits';
  let totalVisits = Storage.get(VISIT_KEY) || 0;

  // 每次访问递增计数
  totalVisits++;
  Storage.set(VISIT_KEY, totalVisits);

  // 更新所有计数器显示
  counters.forEach(counter => {
    counter.textContent = `本站总访问量：${totalVisits} 次`;
  });
}

export async function initWeatherWidget() {
  const weatherContainer = document.querySelector('.weather-widget');
  if (!weatherContainer) return;

  try {
    // 配置API参数
    const API_KEY = '61179140c0333f2b8f4444e29c80eb9b'; // 你的API密钥
    const CITY_ADCODE = '110101'; // 北京东城区（可替换为目标城市编码）
    const API_URL = `https://restapi.amap.com/v3/weather/weatherInfo?` +
                   `city=${CITY_ADCODE}&` +
                   `extensions=base&` + // 获取实时天气
                   `output=JSON&` +
                   `key=${API_KEY}`;

    // 发送请求
    const response = await fetch(API_URL);
    const data = await response.json();

    // 处理响应数据
    if (data.status === '1' && data.infocode === '10000' && data.lives.length > 0) {
      const weatherData = data.lives[0];
      const weatherHtml = `
        <div class="weather-title">当前天气（${weatherData.city}）</div>
        <div class="weather-info">
          <span class="weather-icon">${getWeatherIcon(weatherData.weather)}</span>
          <div class="weather-details">
            <div class="weather-temp">${weatherData.temperature}°C</div>
            <div>天气：${weatherData.weather}</div>
            <div>风向：${weatherData.winddirection} ${weatherData.windpower}级</div>
            <div>湿度：${weatherData.humidity}%</div>
            <div>更新时间：${weatherData.reporttime}</div>
          </div>
        </div>
      `;
      weatherContainer.innerHTML = weatherHtml;
    } else {
      weatherContainer.innerHTML = `<div>天气数据加载失败：${data.info || '未知错误'}</div>`;
    }
  } catch (error) {
    console.error('天气API请求失败:', error);
    weatherContainer.innerHTML = '<div>网络错误，无法加载天气</div>';
  }
}

// 天气图标映射（适配高德天气类型）
function getWeatherIcon(weatherText) {
  const iconMap = {
    '晴': '☀️',
    '多云': '⛅',
    '阴': '☁️',
    '雨': '🌧️',
    '小雨': '🌦️',
    '中雨': '🌧️',
    '大雨': '🌧️',
    '暴雨': '⛈️',
    '雪': '❄️',
    '小雪': '🌨️',
    '中雪': '❄️',
    '大雪': '❄️',
    '雾': '🌫️',
    '风': '💨'
  };

  // 优先精确匹配，再关键字匹配
  if (iconMap[weatherText]) return iconMap[weatherText];

  const matchedKey = Object.keys(iconMap).find(key => weatherText.includes(key));
  return matchedKey ? iconMap[matchedKey] : '🌤️';
}