enum Style {
  info = 'info',
  success = 'success',
  warning = 'warning',
}

export class Logger {
  private styles = {
    info: '\x1b[34m%s\x1b[0m', //blue
    success: '\x1b[32m%s\x1b[0m', //green
    warning: '\x1b[33m%s\x1b[0m', //yellow
  };

  private getLoggerBase(logType: Style, text: any) {
    console.log(this.styles[logType], `${Style[logType]}:`, ` ${text}`);
  }

  logger: {
    [key in Style]: (text: any) => any;
  } = {
    [Style.info]: (text) => this.getLoggerBase(Style.info, text),
    [Style.success]: (text) => this.getLoggerBase(Style.success, text),
    [Style.warning]: (text) => this.getLoggerBase(Style.warning, text),
  };
}
