import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarNavigationComponent, TopHeaderComponent],
  template: `
    <div class="app-container">
      <app-top-header 
        (toggleSidebar)="onToggleSidebar()"
        (toggleFilters)="onToggleFilters()"
      ></app-top-header>
      <div class="app-body">
        <app-sidebar-navigation [class.collapsed]="!showSidebar"></app-sidebar-navigation>
        <main class="app-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    .app-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .app-content {
      flex: 1;
      overflow: hidden;
      background-color: var(--ondc-background);
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'Rozana ONDC - Item Management';
  showSidebar = true;
  showFilters = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('AppComponent: ngOnInit called');
    // Listen for filter state changes from pages
    window.addEventListener('filtersStateChanged', (event: any) => {
      console.log('AppComponent: filtersStateChanged event received', event.detail);
      this.showFilters = event.detail.open;
      if (this.showFilters && this.showSidebar) {
        this.showSidebar = false;
      }
      this.cdr.detectChanges();
    });
  }

  onToggleSidebar() {
    console.log('AppComponent: onToggleSidebar called', { currentState: this.showSidebar });
    this.showSidebar = !this.showSidebar;
    
    // If opening sidebar, close filters
    if (this.showSidebar && this.showFilters) {
      console.log('AppComponent: Closing filters to open sidebar');
      window.dispatchEvent(new CustomEvent('closeFilters'));
    }
    
    this.cdr.detectChanges();
  }

  onToggleFilters() {
    console.log('AppComponent: onToggleFilters called', { currentState: this.showFilters });
    this.showFilters = !this.showFilters;
    
    // If opening filters, close sidebar
    if (this.showFilters && this.showSidebar) {
      console.log('AppComponent: Closing sidebar to open filters');
      this.showSidebar = false;
    }
    
    // Notify pages about filter toggle
    window.dispatchEvent(new CustomEvent('toggleFilters', { 
      detail: { open: this.showFilters } 
    }));
    
    this.cdr.detectChanges();
  }
}
