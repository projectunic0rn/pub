import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { MultiTabMenu } from '../multi-tab-menu';

describe('multi tab menu tests', () => {
  test('menu contains all tabs', async () => {
    // Arrange
    const menuItems = ['TabOne', 'TabTwo', 'TabThree'];
    const { findByTestId } = render(<MultiTabMenu tabs={menuItems} />);

    // Act
    const result = await findByTestId('menu-items');

    // Assert
    expect(result.children.length).toEqual(menuItems.length);
  });

  test('menu emphasizes first item with bottom border', async () => {
    // Arrange
    const menuItems = ['TabOne', 'TabTwo', 'TabThree'];
    const { findByTestId } = render(<MultiTabMenu tabs={menuItems} />);

    // Act
    const result = await findByTestId('menu-items');
    const firstMenuItem = result.children[0];
    const secondMenuItem = result.children[1];
    const lastMenuItem = result.children[2];

    // Assert
    expect(firstMenuItem).toHaveStyle('border-bottom: 1px solid #000000;');
    expect(secondMenuItem).toHaveStyle('border-bottom: none;');
    expect(lastMenuItem).toHaveStyle('border-bottom: none;');
  });

  test('menu item emphasized once clicked and removes emphasis from all others', async () => {
    // Arrange
    const menuItems = ['TabOne', 'TabTwo', 'TabThree'];
    const { findByTestId } = render(<MultiTabMenu tabs={menuItems} />);

    // Act
    const result = await findByTestId('menu-items');
    const firstMenuItem = result.children[0];
    const secondMenuItem = result.children[1];
    const lastMenuItem = result.children[2];
    fireEvent.click(secondMenuItem);
    // Assert
    expect(firstMenuItem).toHaveStyle('border-bottom: none;');
    expect(lastMenuItem).toHaveStyle('border-bottom: none;');
    expect(secondMenuItem).toHaveStyle('border-bottom: 1px solid #000000;');
  });
});
