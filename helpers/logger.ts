enum Style {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export class LoggerHelper {
  private styles = {
    info: '\x1b[34m%s\x1b[0m', //blue
    success: '\x1b[32m%s\x1b[0m', //green
    warning: '\x1b[33m%s\x1b[0m', //yellow
    error: '\x1b[31m%s\x1b[0m',
  };

  private getLoggerBase(logType: Style, text: any) {
    if (logType === Style.error) {
      throw (this.styles[logType], `${Style[logType]}:`, ` ${text}`);
    }
    console.log(this.styles[logType], `${Style[logType]}:`, ` ${text}`);
  }

  logger: {
    [key in Style]: (text: any) => any;
  } = {
    [Style.info]: (text) => this.getLoggerBase(Style.info, text),
    [Style.success]: (text) => this.getLoggerBase(Style.success, text),
    [Style.warning]: (text) => this.getLoggerBase(Style.warning, text),
    [Style.error]: (text) => this.getLoggerBase(Style.error, text),
  };
}
