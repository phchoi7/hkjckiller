


import React from 'react';

import { Money } from 'grommet-icons';

import { Box, Button, Grommet, Heading, Layer, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const CenterLayer = ({ betAnswer,matchTeam,betType }:any) => {
  const [open, setOpen] = React.useState<boolean>();
  const [open2, setOpen2] = React.useState<boolean>();


  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(undefined);

  const onOpen2 = () => setOpen2(true);

  const onClose2 = () => setOpen2(undefined);

  return (
<>


<Box align="center" pad="medium">
      <Button icon={<Money  />} label="Tips!" onClick={onOpen}/>
    </Box>

      {open && (
        <Layer
          id="hello world"
          position="center"
          onClickOutside={onClose}
          onEsc={onClose}
          modal={true}
          responsive={true}
          style={{maxHeight:'180px',  borderRadius:'4px',boxShadow:'0px 8px 16px rgb(0 0 0 / 20%)',maxWidth:'400px'}}
        >
          <Box pad="medium" gap="small" width="medium" >
            <Heading level={3} margin="none">
              本場貼士
            </Heading>
            <Text>{matchTeam}</Text>
            <Text>選擇: {betType} {betAnswer}</Text>

            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: 'medium', bottom: 'small' }}
            >
           
              <Button
                label={
                  <Text color="white">
                    <strong>OK!</strong>
                  </Text>
                }
                onClick={onClose}
                primary
                color="status-critical"
              />
            </Box>
          </Box>
        </Layer>
      )}
</>
  );
};