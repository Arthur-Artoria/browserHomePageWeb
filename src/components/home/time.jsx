import React, { Component } from 'react';
import day from 'dayjs';
import './time.scss';
export class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: day()
    };

    this.setTimeRush();
  }

  /**
   * * 设置时间的自动刷新
   * @param {number} sleep 计时器等待时间
   */
  setTimeRush(sleep = 1000) {
    setInterval(() => {
      this.setState({
        time: day()
      });
    }, sleep);
  }

  /**
   * * 根据当前时间获取格式化显示
   */
  getFormatTime() {
    const curDay = day(this.state.time);
    return curDay.format('HH:mm');
  }

  /**
   * * 根据当前时间获取问候语
   */
  getTip() {
    const curDay = day(this.state.time);
    const curHour = curDay.hour();

    switch (Math.floor(curHour / 6)) {
      case 0:
        return '晚安';
      case 1:
        return '上午好';
      case 2:
        return '下午好';
      default:
        return '晚上好';
    }
  }

  render() {
    return (
      <section id="home-time">
        <h1 className="home-time__time">{this.getFormatTime()}</h1>
        <h2 className="home-time__tip">{this.getTip()}</h2>
      </section>
    );
  }
}

export default Time;
