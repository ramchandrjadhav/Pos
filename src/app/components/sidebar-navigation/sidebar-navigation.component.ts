import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-sidebar-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss']
})
export class SidebarNavigationComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Items',
      icon: 'pi-box',
      route: '/items',
      active: true
    },
    {
      label: 'Categories',
      icon: 'pi-tags',
      route: '/categories',
      active: false
    },
    {
      label: 'Sellers',
      icon: 'pi-truck',
      route: '/sellers',
      active: false
    },
    {
      label: 'Locations',
      icon: 'pi-map-marker',
      route: '/locations',
      active: false
    }
  ];
}

