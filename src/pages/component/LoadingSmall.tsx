import React, {Component} from 'react';
import "./Load.css";

import { grommet, Box, Button, Grommet, Layer, Spinner, Text } from 'grommet';




function LoadingSmall() {

    return (
        <Box
            align="center"
            justify="center"
            gap="small"
            direction="row"
            alignSelf="center"
            pad="large"
          >
            <Spinner />
            <Text>Loading...</Text>
          </Box>

    );
  }


export default LoadingSmall;