<script lang="ts">
	let { children } = $props();
	
	let sidebarOpen = $state(true);
	let activeMenu = $state('dashboard');
	
	const menuItems = [
		{ id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/admin' },
		{ id: 'users', label: 'Users', icon: '👥', href: '/admin/users' },
		{ id: 'products', label: 'Products', icon: '📦', href: '/admin/products' },
		{ id: 'orders', label: 'Orders', icon: '🛒', href: '/admin/orders' },
		{ id: 'reports', label: 'Reports', icon: '📈', href: '/admin/reports' },
		{ id: 'settings', label: 'Settings', icon: '⚙️', href: '/admin/settings' }
	];
	
	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}
	
	function setActiveMenu(id: string) {
		activeMenu = id;
	}
</script>

<div class="admin-wrapper">
	<!-- Sidebar -->
	<aside class="sidebar" class:collapsed={!sidebarOpen}>
		<div class="sidebar-header">
			<div class="logo">
				<span class="logo-icon">🚀</span>
				{#if sidebarOpen}
					<span class="logo-text">SaaS Admin</span>
				{/if}
			</div>
		</div>
		
		<nav class="sidebar-nav">
			{#each menuItems as item}
				<a 
					href={item.href}
					class="nav-item"
					class:active={activeMenu === item.id}
					class:collapsed={!sidebarOpen}
					onclick={() => setActiveMenu(item.id)}
					title={!sidebarOpen ? item.label : ''}
				>
					<span class="nav-icon">{item.icon}</span>
					{#if sidebarOpen}
						<span class="nav-label">{item.label}</span>
					{/if}
				</a>
			{/each}
		</nav>
	</aside>
	
	<!-- Main Content -->
	<div class="main-wrapper" class:sidebar-collapsed={!sidebarOpen}>
		<!-- Header -->
		<header class="main-header">
			<div class="header-left">
				<button class="btn-toggle" onclick={toggleSidebar}>
					<span class="toggle-icon">{sidebarOpen ? '☰' : '☷'}</span>
				</button>
				<h1 class="page-title">{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}</h1>
			</div>
			
			<div class="header-right">
				<div class="header-search" class:hidden={!sidebarOpen}>
					<input type="text" placeholder="Search..." class="search-input" />
				</div>
				
				<div class="dropdown">
					<button class="btn-notification">
						<span>🔔</span>
						<span class="badge">3</span>
					</button>
				</div>
				
				<div class="dropdown user-dropdown">
					<button class="btn-user">
						<span class="user-avatar">👤</span>
						<span class="user-name">Admin</span>
						<span class="dropdown-arrow">▼</span>
					</button>
				</div>
			</div>
		</header>
		
		<!-- Content -->
		<main class="content-wrapper">
			{@render children()}
		</main>
		
		<!-- Footer -->
		<footer class="main-footer">
			<div class="footer-left">
				<strong>Copyright © 2026 <a href="/">SaaS App</a>.</strong> All rights reserved.
			</div>
			<div class="footer-right">
				Powered by <a href="https://svelte.dev">SvelteKit</a>
			</div>
		</footer>
	</div>
</div>

<style>
	.admin-wrapper {
		display: flex;
		min-height: 100vh;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
	
	/* Sidebar */
	.sidebar {
		width: 250px;
		background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
		color: #fff;
		transition: width 0.3s ease;
		position: fixed;
		height: 100vh;
		z-index: 1000;
		box-shadow: 2px 0 10px rgba(0,0,0,0.1);
	}
	
	.sidebar.collapsed {
		width: 60px;
	}
	
	.sidebar-header {
		padding: 20px;
		border-bottom: 1px solid rgba(255,255,255,0.1);
	}
	
	.logo {
		display: flex;
		align-items: center;
		gap: 10px;
		justify-content: center;
	}
	
	.logo-text {
		font-size: 18px;
		font-weight: 700;
		white-space: nowrap;
	}
	
	.sidebar-nav {
		padding: 15px 10px;
	}
	
	.nav-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 15px;
		color: rgba(255,255,255,0.8);
		text-decoration: none;
		border-radius: 8px;
		margin-bottom: 5px;
		transition: all 0.2s;
		position: relative;
	}
	
	.nav-item.collapsed {
		justify-content: center;
		padding: 12px;
	}
	
	.nav-item.collapsed .nav-icon {
		font-size: 20px;
	}
	
	.nav-item.collapsed:hover::after {
		content: attr(title);
		position: absolute;
		left: 100%;
		margin-left: 10px;
		background: #333;
		color: #fff;
		padding: 8px 12px;
		border-radius: 5px;
		font-size: 14px;
		white-space: nowrap;
		z-index: 1001;
		box-shadow: 0 2px 10px rgba(0,0,0,0.2);
	}
	
	.nav-item:hover {
		background: rgba(255,255,255,0.1);
		color: #fff;
	}
	
	.nav-item.active {
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
		color: #fff;
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
	}
	
	.nav-icon {
		font-size: 18px;
		width: 24px;
		text-align: center;
	}
	
	.nav-label {
		white-space: nowrap;
	}
	
	/* Main Wrapper */
	.main-wrapper {
		flex: 1;
		margin-left: 250px;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: #f4f6f9;
		transition: margin-left 0.3s ease;
	}
	
	.main-wrapper.sidebar-collapsed {
		margin-left: 60px;
	}
	
	/* Header */
	.main-header {
		background: #fff;
		padding: 15px 25px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
		position: sticky;
		top: 0;
		z-index: 100;
	}
	
	.header-left {
		display: flex;
		align-items: center;
		gap: 15px;
	}
	
	.btn-toggle {
		background: none;
		border: none;
		font-size: 20px;
		cursor: pointer;
		padding: 5px 10px;
		border-radius: 5px;
		transition: background 0.2s;
	}
	
	.btn-toggle:hover {
		background: #f0f0f0;
	}
	
	.page-title {
		font-size: 20px;
		font-weight: 600;
		color: #333;
		margin: 0;
	}
	
	.header-right {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	
	.header-search {
		position: relative;
	}
	
	.search-input {
		padding: 8px 15px;
		border: 1px solid #ddd;
		border-radius: 20px;
		width: 250px;
		font-size: 14px;
		transition: border-color 0.2s;
	}
	
	.header-search.hidden {
		display: none;
	}
	
	.search-input:focus {
		outline: none;
		border-color: #667eea;
	}
	
	.btn-notification {
		position: relative;
		background: none;
		border: none;
		font-size: 20px;
		cursor: pointer;
		padding: 5px;
	}
	
	.badge {
		position: absolute;
		top: 0;
		right: 0;
		background: #ff4757;
		color: #fff;
		font-size: 10px;
		padding: 2px 5px;
		border-radius: 10px;
	}
	
	.btn-user {
		display: flex;
		align-items: center;
		gap: 8px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 5px 10px;
		border-radius: 5px;
		transition: background 0.2s;
	}
	
	.btn-user:hover {
		background: #f0f0f0;
	}
	
	.user-avatar {
		font-size: 20px;
	}
	
	.user-name {
		font-weight: 500;
		color: #333;
	}
	
	.dropdown-arrow {
		font-size: 10px;
		color: #666;
	}
	
	/* Content */
	.content-wrapper {
		flex: 1;
		padding: 25px;
	}
	
	/* Footer */
	.main-footer {
		background: #fff;
		padding: 15px 25px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #eee;
		font-size: 14px;
		color: #666;
	}
	
	.main-footer a {
		color: #667eea;
		text-decoration: none;
	}
	
	.main-footer a:hover {
		text-decoration: underline;
	}
	
	/* Cards */
	:global(.card) {
		background: #fff;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
		margin-bottom: 20px;
	}
	
	:global(.card-header) {
		padding: 15px 20px;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	:global(.card-title) {
		font-size: 18px;
		font-weight: 600;
		color: #333;
		margin: 0;
	}
	
	:global(.card-body) {
		padding: 20px;
	}
	
	/* Info Boxes */
	:global(.info-box) {
		background: #fff;
		border-radius: 10px;
		padding: 20px;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
		display: flex;
		align-items: center;
		gap: 15px;
	}
	
	:global(.info-box-icon) {
		width: 60px;
		height: 60px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30px;
	}
	
	:global(.info-box-content) {
		flex: 1;
	}
	
	:global(.info-box-text) {
		font-size: 14px;
		color: #666;
		margin-bottom: 5px;
	}
	
	:global(.info-box-number) {
		font-size: 28px;
		font-weight: 700;
		color: #333;
	}
</style>
