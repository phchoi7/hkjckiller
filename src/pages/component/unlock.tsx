import React from 'react';

import {
  Box,
  Grommet,
  RoutedButton as GrommetRoutedButton,
  Text,
} from 'grommet';
import { grommet } from 'grommet/themes';

export const UnlockButton = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Text margin="medium" size="small">
        立即加入會員解鎖高手貼士!!
      </Text>
      <GrommetRoutedButton label="加入會員!" path="/"/>
    </Box>
  </Grommet>
);

UnlockButton.storyName = 'Routed button';

export default {
  title: `Controls/Button/Routed button`,
};