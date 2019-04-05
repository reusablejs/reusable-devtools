import React, { Component } from 'react';
import PropTypes from 'prop-types';
import observeResize from 'simple-element-resize-detector';
import ContextMenu from '../ContextMenu/ContextMenu';
import createStyledComponent from '../utils/createStyledComponent';
import * as styles from './styles';

const TabsWrapper = createStyledComponent(styles);

export default class TabsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleTabs: props.tabs.slice(),
      hiddenTabs: [],
      subMenuOpened: false,
      contextMenu: undefined
    };
    this.iconWidth = 0;
    this.hiddenTabsWidth = [];
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.tabs !== this.props.tabs ||
      nextProps.selected !== this.props.selected ||
      nextProps.collapsible !== this.props.collapsible
    ) {
      this.setState({ hiddenTabs: [], visibleTabs: nextProps.tabs.slice() });
    }
  }

  componentDidMount() {
    if (this.props.collapsible) {
      this.collapse();
      this.enableResizeEvents();
    }
  }

  componentDidUpdate(prevProps) {
    const { collapsible } = this.props;
    if (!collapsible) {
      if (prevProps.collapsible !== collapsible) this.disableResizeEvents();
      return;
    }

    let shouldCollapse = false;
    if (this.iconWidth === 0) {
      const tabButtons = this.tabsRef.children;
      if (this.tabsRef.children[tabButtons.length - 1].value === 'expandIcon') {
        this.iconWidth = tabButtons[
          tabButtons.length - 1
        ].getBoundingClientRect().width;
        shouldCollapse = true;
      }
    } else if (this.state.hiddenTabs.length === 0) {
      this.iconWidth = 0;
    }

    if (prevProps.collapsible !== collapsible) {
      this.enableResizeEvents();
      shouldCollapse = true;
    }

    if (shouldCollapse || this.props.selected !== prevProps.selected) {
      this.collapse();
    }
  }

  componentWillUnmount() {
    this.disableResizeEvents();
  }

  enableResizeEvents() {
    this.resizeDetector = observeResize(this.tabsWrapperRef, this.collapse);
    window.addEventListener('mousedown', this.hideSubmenu);
  }

  disableResizeEvents() {
    this.resizeDetector.remove();
    window.removeEventListener('mousedown', this.hideSubmenu);
  }

  collapse = () => {
    if (this.state.subMenuOpened) this.hideSubmenu();

    const { selected, tabs } = this.props;
    const tabsWrapperRef = this.tabsWrapperRef;
    const tabsRef = this.tabsRef;
    const tabButtons = this.tabsRef.children;
    const visibleTabs = this.state.visibleTabs;
    const hiddenTabs = this.state.hiddenTabs;
    let tabsWrapperRight = tabsWrapperRef.getBoundingClientRect().right;
    if (!tabsWrapperRight) return; // tabs are hidden

    const tabsRefRight = tabsRef.getBoundingClientRect().right;
    let i = visibleTabs.length - 1;
    let hiddenTab;

    if (tabsRefRight >= tabsWrapperRight - this.iconWidth) {
      if (
        this.props.position === 'right' &&
        hiddenTabs.length > 0 &&
        tabsRef.getBoundingClientRect().width + this.hiddenTabsWidth[0] <
          tabsWrapperRef.getBoundingClientRect().width
      ) {
        while (
          i < tabs.length - 1 &&
          tabsRef.getBoundingClientRect().width + this.hiddenTabsWidth[0] <
            tabsWrapperRef.getBoundingClientRect().width
        ) {
          hiddenTab = hiddenTabs.shift();
          visibleTabs.splice(Number(hiddenTab.key), 0, hiddenTab);
          i++;
        }
      } else {
        while (
          i > 0 &&
          tabButtons[i] &&
          tabButtons[i].getBoundingClientRect().right >=
            tabsWrapperRight - this.iconWidth
        ) {
          if (tabButtons[i].value !== selected) {
            hiddenTabs.unshift(...visibleTabs.splice(i, 1));
            this.hiddenTabsWidth.unshift(
              tabButtons[i].getBoundingClientRect().width
            );
          } else {
            tabsWrapperRight -= tabButtons[i].getBoundingClientRect().width;
          }
          i--;
        }
      }
    } else {
      while (
        i < tabs.length - 1 &&
        tabButtons[i] &&
        tabButtons[i].getBoundingClientRect().right + this.hiddenTabsWidth[0] <
          tabsWrapperRight - this.iconWidth
      ) {
        hiddenTab = hiddenTabs.shift();
        visibleTabs.splice(Number(hiddenTab.key), 0, hiddenTab);
        this.hiddenTabsWidth.shift();
        i++;
      }
    }
    this.setState({ visibleTabs, hiddenTabs });
  };

  hideSubmenu = () => {
    this.setState({ subMenuOpened: false, contextMenu: undefined });
  };

  getTabsWrapperRef = node => {
    this.tabsWrapperRef = node;
  };

  getTabsRef = node => {
    this.tabsRef = node;
  };

  expandMenu = e => {
    const rect = e.currentTarget.children[0].getBoundingClientRect();
    this.setState({
      contextMenu: {
        top: rect.top + 10,
        left: rect.left
      },
      subMenuOpened: true
    });
  };

  render() {
    const { visibleTabs, hiddenTabs, contextMenu } = this.state;
    return (
      <TabsWrapper
        ref={this.getTabsWrapperRef}
        main={this.props.main}
        position={this.props.position}
      >
        <div ref={this.getTabsRef}>
          {visibleTabs}
          {this.props.collapsible &&
            visibleTabs.length < this.props.items.length && (
              <button onClick={this.expandMenu} value="expandIcon">
                COLLAPSEICON
              </button>
            )}
        </div>
        {this.props.collapsible && contextMenu && (
          <ContextMenu
            items={hiddenTabs}
            onClick={this.props.onClick}
            x={contextMenu.left}
            y={contextMenu.top}
            visible={this.state.subMenuOpened}
          />
        )}
      </TabsWrapper>
    );
  }
}

TabsHeader.propTypes = {
  tabs: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  main: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.string,
  collapsible: PropTypes.bool,
  selected: PropTypes.string
};
