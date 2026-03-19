<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { locale, currentTranslations } from '$lib/i18n';
	import { formatDate } from '$lib/i18n/dates';
	import { derived } from 'svelte/store';
	
	let { data } = $props();
	
	let searchQuery = $state('');
	let showModal = $state(false);
	let editingUser = $state<{id: string; name: string; email: string} | null>(null);
	
	const currentLocale = derived(locale, ($locale) => $locale);
	const t = $derived($currentTranslations);
	
	const filteredUsers = $derived(
		data.users.filter(u => 
			u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			u.email.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
	
	function formatUserDate(dateStr: string | Date | null): string {
		return formatDate(dateStr, $currentLocale);
	}
	
	function openAddModal() {
		editingUser = { id: '', name: '', email: '' };
		showModal = true;
	}
	
	function openEditModal(user: typeof data.users[0]) {
		editingUser = { id: user.id, name: user.name, email: user.email };
		showModal = true;
	}
	
	function closeModal() {
		showModal = false;
		editingUser = null;
	}
	
	async function saveUser() {
		if (!editingUser) return;
		
		const method = editingUser.id ? 'PUT' : 'POST';
		const url = editingUser.id ? `/api/users/${editingUser.id}` : '/api/users';
		
		await fetch(url, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: editingUser.name, email: editingUser.email })
		});
		
		closeModal();
		await invalidateAll();
	}
	
	async function deleteUser(id: string) {
		if (!confirm(t.users.confirmDelete)) return;
		
		await fetch(`/api/users/${id}`, { method: 'DELETE' });
		await invalidateAll();
	}
</script>

<svelte:head>
	<title>{t.users.title} - Admin</title>
</svelte:head>

<div class="page-header">
	<h1>{t.users.title}</h1>
	<button class="btn btn-primary" onclick={openAddModal}>➕ {t.users.addNew}</button>
</div>

<div class="card">
	<div class="card-header">
		<h3 class="card-title">{t.users.title} ({filteredUsers.length})</h3>
		<div class="header-actions">
			<input 
				type="text" 
				placeholder={t.users.search} 
				class="search-input"
				bind:value={searchQuery}
			/>
		</div>
	</div>
	<div class="card-body" style="padding: 0;">
		<table class="data-table">
			<thead>
				<tr>
					<th><input type="checkbox" /></th>
					<th>{t.users.name}</th>
					<th>{t.users.email}</th>
					<th>{t.users.joined}</th>
					<th>{t.users.actions}</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredUsers as user}
					<tr>
						<td><input type="checkbox" /></td>
						<td>
							<div class="user-cell">
								<span class="user-avatar">👤</span>
								<span class="user-name">{user.name}</span>
							</div>
						</td>
						<td>{user.email}</td>
						<td>{formatUserDate(user.createdAt)}</td>
						<td>
							<button class="btn-icon" title={t.users.edit} onclick={() => openEditModal(user)}>✏️</button>
							<button class="btn-icon btn-danger" title={t.users.delete} onclick={() => deleteUser(user.id)}>🗑️</button>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="5" style="text-align: center; padding: 40px;">{t.users.noUsers}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="card-footer">
		<span class="showing">{t.users.showing.replace('{from}', '1').replace('{to}', String(filteredUsers.length)).replace('{total}', String(data.users.length))}</span>
	</div>
</div>

{#if showModal && editingUser}
	<div class="modal-overlay" onclick={closeModal} onkeydown={(e) => e.key === 'Escape' && closeModal()} role="dialog" aria-modal="true" tabindex="-1">
		<div class="modal" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="document">
			<div class="modal-header">
				<h2>{editingUser.id ? t.users.modalEdit : t.users.modalAdd}</h2>
				<button class="btn-close" onclick={closeModal}>×</button>
			</div>
			<form onsubmit={(e) => { e.preventDefault(); saveUser(); }}>
				<div class="form-group">
					<label for="name">{t.users.name}</label>
					<input type="text" id="name" bind:value={editingUser.name} required />
				</div>
				<div class="form-group">
					<label for="email">{t.users.email}</label>
					<input type="email" id="email" bind:value={editingUser.email} required />
				</div>
				<div class="modal-actions">
					<button type="button" class="btn btn-secondary" onclick={closeModal}>{t.common.cancel}</button>
					<button type="submit" class="btn btn-primary">{t.common.save}</button>
				</div>
			</form>
		</div>
	</div>
{/if}

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
	
	.btn-secondary {
		background: #e0e0e0;
		color: #333;
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
	
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}
	
	.modal {
		background: #fff;
		border-radius: 12px;
		padding: 25px;
		width: 100%;
		max-width: 450px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
	}
	
	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}
	
	.modal-header h2 {
		margin: 0;
		font-size: 20px;
		color: #333;
	}
	
	.btn-close {
		background: none;
		border: none;
		font-size: 24px;
		cursor: pointer;
		color: #666;
	}
	
	.form-group {
		margin-bottom: 15px;
	}
	
	.form-group label {
		display: block;
		margin-bottom: 5px;
		font-weight: 500;
		color: #333;
	}
	
	.form-group input {
		width: 100%;
		padding: 10px 12px;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 14px;
		box-sizing: border-box;
	}
	
	.form-group input:focus {
		outline: none;
		border-color: #667eea;
	}
	
	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		margin-top: 20px;
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
