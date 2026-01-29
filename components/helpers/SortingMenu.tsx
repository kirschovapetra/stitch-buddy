import * as React from 'react';
import { Button, Text, Menu, Divider } from 'react-native-paper';

import {styles} from "@/assets/styles";
import {useState} from "react";
import {SORT_BY, SORT_DIRECTION, SortingMenuProps} from "@/assets/types";

/**
 *
 * @param sortMetadata
 * @param sortBy
 * @param setSortBy
 * @param sortDirection
 * @param setSortDirection
 * @constructor
 */
export function SortingMenu({sortMetadata, sortBy, setSortBy, sortDirection, setSortDirection}: SortingMenuProps) {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = (sortByValue:SORT_BY, sortDirectionValue:SORT_DIRECTION) => {
        setSortBy(sortByValue)
        setSortDirection(sortDirectionValue)
        sortMetadata(sortByValue, sortDirectionValue)
        setVisible(false)
    };

    return (
        <Menu contentStyle={styles.menuContent}
              visible={visible}
              onDismiss={()=>closeMenu(sortBy, sortDirection)}
              anchor={
            <Button contentStyle={{ flexDirection: 'row-reverse'}}
                    mode="elevated"
                    onPress={openMenu}
                    icon={sortDirection===SORT_DIRECTION.ASC ? "sort-ascending" : "sort-descending"}>
                {sortBy}
            </Button>
        }>
            <Text variant="bodySmall" style={styles.sortMenuText}>Sort By</Text>

            <Menu.Item leadingIcon="format-title"
                       onPress={() => closeMenu(SORT_BY.NAME, sortDirection)}
                       title={SORT_BY.NAME}
                       disabled={sortBy===SORT_BY.NAME}/>

            <Menu.Item leadingIcon="creation"
                       onPress={() => closeMenu(SORT_BY.CREATED, sortDirection)}
                       title={SORT_BY.CREATED}
                       disabled={sortBy===SORT_BY.CREATED}/>

            <Menu.Item leadingIcon="update"
                       onPress={() => closeMenu(SORT_BY.UPDATED, sortDirection)}
                       title={SORT_BY.UPDATED}
                       disabled={sortBy===SORT_BY.UPDATED}/>

            <Divider/>
            <Text variant="bodySmall" style={styles.sortMenuText}>Sort Direction</Text>

            <Menu.Item leadingIcon="sort-ascending"
                       onPress={() => closeMenu(sortBy,SORT_DIRECTION.ASC)}
                       title={SORT_DIRECTION.ASC}
                       disabled={sortDirection===SORT_DIRECTION.ASC}/>
            <Menu.Item leadingIcon="sort-descending"
                       onPress={() => closeMenu(sortBy,SORT_DIRECTION.DESC)}
                       title={SORT_DIRECTION.DESC}
                       disabled={sortDirection===SORT_DIRECTION.DESC}/>
        </Menu>
    );
}