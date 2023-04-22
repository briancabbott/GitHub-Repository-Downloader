import React from 'react';

export const onRenderBody = ({setHeadComponents}, pluginOptions) => {
  if (process.env.NODE_ENV === 'production' && !pluginOptions.skip) {
    setHeadComponents([
      <script
        src={pluginOptions.otSDKStubSrc}
        type="text/javascript"
        charset="UTF-8"
        data-domain-script={pluginOptions.dataDomainScript}
      />,
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{__html: 'function OptanonWrapper() {}'}}
      />,
    ])
  }
}
