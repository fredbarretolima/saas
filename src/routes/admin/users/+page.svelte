<script lang="ts">
	const users = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', date: '2026-03-15' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', date: '2026-03-14' },
		{ id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Active', date: '2026-03-13' },
		{ id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Inactive', date: '2026-03-12' },
		{ id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Editor', status: 'Active', date: '2026-03-11' }
	];
</script>

<svelte:head>
	<title>Users - Admin</title>
</svelte:head>

<div class="page-header">
	<h1>User Management</h1>
	<button class="btn btn-primary">➕ Add New User</button>
</div>

<div class="card">
	<div class="card-header">
		<h3 class="card-title">All Users ({users.length})</h3>
		<div class="header-actions">
			<input type="text" placeholder="Search users..." class="search-input" />
			<select class="filter-select">
				<option>All Roles</option>
				<option>Admin</option>
				<option>Editor</option>
				<option>User</option>
			</select>
		</div>
	</div>
	<div class="card-body" style="padding: 0;">
		<table class="data-table">
			<thead>
				<tr>
					<th><input type="checkbox" /></th>
					<th>Name</th>
					<th>Email</th>
					<th>Role</th>
					<th>Status</th>
					<th>Joined</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each users as user}
					<tr>
						<td><input type="checkbox" /></td>
						<td>
							<div class="user-cell">
								<span class="user-avatar">👤</span>
								<span class="user-name">{user.name}</span>
							</div>
						</td>
						<td>{user.email}</td>
						<td><span class="role-badge role-{user.role.toLowerCase()}">{user.role}</span></td>
						<td><span class="status-badge status-{user.status.toLowerCase()}">{user.status}</span></td>
						<td>{user.date}</td>
						<td>
							<button class="btn-icon" title="Edit">✏️</button>
							<button class="btn-icon" title="View">👁️</button>
							<button class="btn-icon btn-danger" title="Delete">🗑️</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="card-footer">
		<span class="showing">Showing 1 to {users.length} of {users.length} entries</span>
		<div class="pagination">
			<button class="btn-pagination" disabled>Previous</button>
			<button class="btn-pagination active">1</button>
			<button class="btn-pagination">2</button>
			<button class="btn-pagination">3</button>
			<button class="btn-pagination">Next</button>
		</div>
	</div>
</div>

<style>
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25px;
	}
	
	.page-header h1 {
		font-size: 28px;
		font-weight: 700;
		color: #333;
		margin: 0;
	}
	
	.btn {
		padding: 10px 20px;
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
	
	.header-actions {
		display: flex;
		gap: 10px;
	}
	
	.search-input {
		padding: 8px 15px;
		border: 1px solid #ddd;
		border-radius: 5px;
		width: 200px;
	}
	
	.filter-select {
		padding: 8px 15px;
		border: 1px solid #ddd;
		border-radius: 5px;
		background: #fff;
	}
	
	.card-footer {
		padding: 15px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #eee;
	}
	
	.showing {
		color: #666;
		font-size: 14px;
	}
	
	.pagination {
		display: flex;
		gap: 5px;
	}
	
	.btn-pagination {
		padding: 8px 12px;
		border: 1px solid #ddd;
		background: #fff;
		border-radius: 5px;
		cursor: pointer;
		transition: all 0.2s;
	}
	
	.btn-pagination:hover:not(:disabled) {
		background: #f0f0f0;
	}
	
	.btn-pagination.active {
		background: #667eea;
		color: #fff;
		border-color: #667eea;
	}
	
	.btn-pagination:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	
	.user-cell {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	
	.user-avatar {
		font-size: 24px;
	}
	
	.user-name {
		font-weight: 500;
		color: #333;
	}
	
	.role-badge {
		padding: 5px 10px;
		border-radius: 15px;
		font-size: 12px;
		font-weight: 500;
	}
	
	.role-admin {
		background: #d4edda;
		color: #155724;
	}
	
	.role-editor {
		background: #fff3cd;
		color: #856404;
	}
	
	.role-user {
		background: #d1ecf1;
		color: #0c5460;
	}
	
	.status-badge {
		padding: 5px 10px;
		border-radius: 15px;
		font-size: 12px;
		font-weight: 500;
	}
	
	.status-active {
		background: #d4edda;
		color: #155724;
	}
	
	.status-inactive {
		background: #f8d7da;
		color: #721c24;
	}
	
	.btn-icon {
		background: none;
		border: 1px solid #ddd;
		padding: 5px 8px;
		border-radius: 4px;
		cursor: pointer;
		margin-right: 5px;
		transition: all 0.2s;
	}
	
	.btn-icon:hover {
		background: #f0f0f0;
	}
	
	.btn-danger:hover {
		background: #f8d7da;
		border-color: #f5c6cb;
	}
	
	:global(.card) {
		background: #fff;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
		overflow: hidden;
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
		padding: 0;
	}
	
	.data-table {
		width: 100%;
		border-collapse: collapse;
	}
	
	:global(.data-table th) {
		background: #f8f9fa;
		padding: 15px 20px;
		text-align: left;
		font-weight: 600;
		color: #333;
		font-size: 14px;
		border-bottom: 2px solid #eee;
	}
	
	:global(.data-table td) {
		padding: 15px 20px;
		border-bottom: 1px solid #eee;
		color: #666;
	}
	
	:global(.data-table tbody tr:hover) {
		background: #f8f9fa;
	}
	
	:global(.data-table input[type="checkbox"]) {
		cursor: pointer;
	}
</style>
