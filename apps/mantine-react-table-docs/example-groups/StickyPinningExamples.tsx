import { useRouter } from 'next/router';
import { Box, Tabs } from '@mantine/core';
import { useState } from 'react';
import StickyHeaderExample from '../examples/enable-sticky-header';
import ColumnPinningExample from '../examples/enable-column-pinning';
import RowPinningStickyExample from '../examples/enable-row-pinning-sticky';
import RowPinningStaticExample from '../examples/enable-row-pinning-static';
import StickySelectExample from '../examples/enable-row-pinning-select';

const StickyPinningExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <>
      <Box w={'100%'} mt={1}>
        <Tabs
          value={isPage ? pathname.split('/').pop() : activeTab}
          onChange={(newPath) =>
            isPage && newPath !== 'more'
              ? push(newPath as string)
              : setActiveTab(newPath as string)
          }
          keepMounted={false}
        >
          <Tabs.List grow={!isPage}>
            <Tabs.Tab value="sticky-header">Sticky Header</Tabs.Tab>
            <Tabs.Tab value="column-pinning">Column Pinning</Tabs.Tab>
            <Tabs.Tab value="sticky-row-pinning">Row Pinning (Sticky)</Tabs.Tab>
            <Tabs.Tab value="static-row-pinning">Row Pinning (Static)</Tabs.Tab>
            <Tabs.Tab value="sticky-row-selection">
              Sticky Row Selection
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="sticky-header">
            <StickyHeaderExample />
          </Tabs.Panel>
          <Tabs.Panel value="column-pinning">
            <ColumnPinningExample />
          </Tabs.Panel>
          <Tabs.Panel value="sticky-row-pinning">
            <RowPinningStickyExample />
          </Tabs.Panel>
          <Tabs.Panel value="static-row-pinning">
            <RowPinningStaticExample />
          </Tabs.Panel>
          <Tabs.Panel value="sticky-row-selection">
            <StickySelectExample />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

export default StickyPinningExamples;
