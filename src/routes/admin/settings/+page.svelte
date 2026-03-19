<script lang="ts">
	let activeTab = $state('general');
	
	const tabs = [
		{ id: 'general', label: 'General', icon: '⚙️' },
		{ id: 'security', label: 'Security', icon: '🔒' },
		{ id: 'notifications', label: 'Notifications', icon: '🔔' },
		{ id: 'appearance', label: 'Appearance', icon: '🎨' }
	];
</script>

<svelte:head>
	<title>Settings - Admin</title>
</svelte:head>

<div class="page-header">
	<h1>Settings</h1>
</div>

<div class="settings-container">
	<div class="settings-tabs">
		{#each tabs as tab}
			<button 
				class="tab-btn" 
				class:active={activeTab === tab.id}
				onclick={() => activeTab = tab.id}
			>
				<span class="tab-icon">{tab.icon}</span>
				<span class="tab-label">{tab.label}</span>
			</button>
		{/each}
	</div>
	
	<div class="settings-content">
		{#if activeTab === 'general'}
			<div class="settings-section">
				<h2>General Settings</h2>
				<p class="section-desc">Manage your application's general settings</p>
				
				<div class="form-group">
					<label for="siteName">Site Name</label>
					<input type="text" id="siteName" value="SaaS Application" />
				</div>
				
				<div class="form-group">
					<label for="siteUrl">Site URL</label>
					<input type="url" id="siteUrl" value="https://example.com" />
				</div>
				
				<div class="form-group">
					<label for="email">Contact Email</label>
					<input type="email" id="email" value="admin@example.com" />
				</div>
				
				<div class="form-group">
					<label for="timezone">Timezone</label>
					<select id="timezone">
						<option>UTC-5 (Eastern Time)</option>
						<option>UTC (GMT)</option>
						<option>UTC+1 (Central European)</option>
					</select>
				</div>
				
				<div class="form-group">
					<label>Maintenance Mode</label>
					<label class="toggle">
						<input type="checkbox" />
						<span class="toggle-slider"></span>
					</label>
					<span class="toggle-label">Enable maintenance mode</span>
				</div>
			</div>
		{:else if activeTab === 'security'}
			<div class="settings-section">
				<h2>Security Settings</h2>
				<p class="section-desc">Configure security and authentication options</p>
				
				<div class="form-group">
					<label>Two-Factor Authentication</label>
					<label class="toggle">
						<input type="checkbox" checked />
						<span class="toggle-slider"></span>
					</label>
					<span class="toggle-label">Enable 2FA for all users</span>
				</div>
				
				<div class="form-group">
					<label for="sessionTimeout">Session Timeout (minutes)</label>
					<input type="number" id="sessionTimeout" value="30" />
				</div>
				
				<div class="form-group">
					<label for="passwordPolicy">Password Policy</label>
					<select id="passwordPolicy">
						<option>Strong (min 8 chars, uppercase, number, symbol)</option>
						<option>Medium (min 6 chars)</option>
						<option>Weak (any)</option>
					</select>
				</div>
				
				<div class="form-group">
					<label>IP Whitelist</label>
					<textarea placeholder="Enter allowed IP addresses (one per line)"></textarea>
				</div>
			</div>
		{:else if activeTab === 'notifications'}
			<div class="settings-section">
				<h2>Notification Settings</h2>
				<p class="section-desc">Configure how and when you receive notifications</p>
				
				<div class="notification-item">
					<div class="notification-info">
						<strong>New User Registration</strong>
						<p>Get notified when a new user signs up</p>
					</div>
					<label class="toggle">
						<input type="checkbox" checked />
						<span class="toggle-slider"></span>
					</label>
				</div>
				
				<div class="notification-item">
					<div class="notification-info">
						<strong>New Order</strong>
						<p>Get notified when a new order is placed</p>
					</div>
					<label class="toggle">
						<input type="checkbox" checked />
						<span class="toggle-slider"></span>
					</label>
				</div>
				
				<div class="notification-item">
					<div class="notification-info">
						<strong>System Alerts</strong>
						<p>Critical system notifications</p>
					</div>
					<label class="toggle">
						<input type="checkbox" checked />
						<span class="toggle-slider"></span>
					</label>
				</div>
				
				<div class="notification-item">
					<div class="notification-info">
						<strong>Weekly Report</strong>
						<p>Receive weekly summary via email</p>
					</div>
					<label class="toggle">
						<input type="checkbox" />
						<span class="toggle-slider"></span>
					</label>
				</div>
			</div>
		{:else if activeTab === 'appearance'}
			<div class="settings-section">
				<h2>Appearance Settings</h2>
				<p class="section-desc">Customize the look and feel of your application</p>
				
				<div class="form-group">
					<label>Theme</label>
					<div class="theme-options">
						<label class="theme-option">
							<input type="radio" name="theme" value="light" checked />
							<span class="theme-preview light">☀️</span>
							<span>Light</span>
						</label>
						<label class="theme-option">
							<input type="radio" name="theme" value="dark" />
							<span class="theme-preview dark">🌙</span>
							<span>Dark</span>
						</label>
						<label class="theme-option">
							<input type="radio" name="theme" value="auto" />
							<span class="theme-preview auto">🖥️</span>
							<span>Auto</span>
						</label>
					</div>
				</div>
				
				<div class="form-group">
					<label>Accent Color</label>
					<div class="color-options">
						<span class="color-option active" style="background: #667eea;"></span>
						<span class="color-option" style="background: #f56565;"></span>
						<span class="color-option" style="background: #48bb78;"></span>
						<span class="color-option" style="background: #ed8936;"></span>
						<span class="color-option" style="background: #9f7aea;"></span>
					</div>
				</div>
				
				<div class="form-group">
					<label>Compact Mode</label>
					<label class="toggle">
						<input type="checkbox" />
						<span class="toggle-slider"></span>
					</label>
					<span class="toggle-label">Reduce spacing and padding</span>
				</div>
			</div>
		{/if}
		
		<div class="form-actions">
			<button class="btn btn-secondary">Cancel</button>
			<button class="btn btn-primary">Save Changes</button>
		</div>
	</div>
</div>

<style>
	.page-header {
		margin-bottom: 25px;
	}
	
	.page-header h1 {
		font-size: 28px;
		font-weight: 700;
		color: #333;
		margin: 0;
	}
	
	.settings-container {
		display: grid;
		grid-template-columns: 250px 1fr;
		gap: 25px;
	}
	
	.settings-tabs {
		background: #fff;
		border-radius: 10px;
		padding: 15px;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
		height: fit-content;
	}
	
	.tab-btn {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 12px 15px;
		background: none;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		text-align: left;
		color: #666;
		transition: all 0.2s;
		margin-bottom: 5px;
	}
	
	.tab-btn:hover {
		background: #f0f0f0;
	}
	
	.tab-btn.active {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: #fff;
	}
	
	.tab-icon {
		font-size: 18px;
	}
	
	.settings-content {
		background: #fff;
		border-radius: 10px;
		padding: 30px;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
	}
	
	.settings-section h2 {
		font-size: 22px;
		font-weight: 600;
		color: #333;
		margin: 0 0 5px 0;
	}
	
	.section-desc {
		color: #666;
		margin-bottom: 30px;
	}
	
	.form-group {
		margin-bottom: 25px;
	}
	
	.form-group label {
		display: block;
		font-weight: 500;
		color: #333;
		margin-bottom: 8px;
	}
	
	.form-group input[type="text"],
	.form-group input[type="email"],
	.form-group input[type="url"],
	.form-group input[type="number"],
	.form-group select {
		width: 100%;
		max-width: 500px;
		padding: 10px 15px;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 14px;
	}
	
	.form-group textarea {
		width: 100%;
		max-width: 500px;
		padding: 10px 15px;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 14px;
		min-height: 100px;
		resize: vertical;
	}
	
	.toggle {
		position: relative;
		display: inline-block;
		width: 50px;
		height: 26px;
	}
	
	.toggle input {
		opacity: 0;
		width: 0;
		height: 0;
	}
	
	.toggle-slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		transition: 0.3s;
		border-radius: 26px;
	}
	
	.toggle-slider:before {
		position: absolute;
		content: "";
		height: 20px;
		width: 20px;
		left: 3px;
		bottom: 3px;
		background-color: white;
		transition: 0.3s;
		border-radius: 50%;
	}
	
	.toggle input:checked + .toggle-slider {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}
	
	.toggle input:checked + .toggle-slider:before {
		transform: translateX(24px);
	}
	
	.toggle-label {
		margin-left: 10px;
		color: #666;
		vertical-align: middle;
	}
	
	.notification-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		border-bottom: 1px solid #eee;
	}
	
	.notification-info strong {
		display: block;
		color: #333;
		margin-bottom: 3px;
	}
	
	.notification-info p {
		margin: 0;
		color: #666;
		font-size: 14px;
	}
	
	.theme-options {
		display: flex;
		gap: 15px;
	}
	
	.theme-option {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		cursor: pointer;
	}
	
	.theme-option input {
		display: none;
	}
	
	.theme-preview {
		width: 80px;
		height: 60px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		border: 3px solid transparent;
		transition: border-color 0.2s;
	}
	
	.theme-preview.light {
		background: #f8f9fa;
		border-color: #ddd;
	}
	
	.theme-preview.dark {
		background: #1a1a2e;
		border-color: #333;
	}
	
	.theme-preview.auto {
		background: linear-gradient(135deg, #f8f9fa 50%, #1a1a2e 50%);
		border-color: #ddd;
	}
	
	.theme-option input:checked + .theme-preview {
		border-color: #667eea;
	}
	
	.color-options {
		display: flex;
		gap: 10px;
	}
	
	.color-option {
		width: 35px;
		height: 35px;
		border-radius: 50%;
		cursor: pointer;
		border: 3px solid transparent;
		transition: all 0.2s;
	}
	
	.color-option:hover {
		transform: scale(1.1);
	}
	
	.color-option.active {
		border-color: #333;
		box-shadow: 0 0 0 3px rgba(0,0,0,0.2);
	}
	
	.form-actions {
		margin-top: 30px;
		padding-top: 20px;
		border-top: 1px solid #eee;
		display: flex;
		gap: 10px;
		justify-content: flex-end;
	}
	
	.btn {
		padding: 10px 25px;
		border-radius: 8px;
		border: none;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}
	
	.btn-primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: #fff;
	}
	
	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
	}
	
	.btn-secondary {
		background: #f0f0f0;
		color: #333;
	}
	
	.btn-secondary:hover {
		background: #e0e0e0;
	}
</style>
