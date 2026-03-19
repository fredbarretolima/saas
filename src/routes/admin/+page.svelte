<script lang="ts">
	import { currentTranslations } from '$lib/i18n';
	
	const t = $derived($currentTranslations);
</script>

<svelte:head>
	<title>{t.dashboard.title} - Admin</title>
</svelte:head>

<div class="dashboard">
	<div class="row">
		<div class="col-md-3">
			<div class="info-box" style="border-left: 4px solid #667eea;">
				<div class="info-box-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
					👥
				</div>
				<div class="info-box-content">
					<p class="info-box-text">{t.dashboard.totalUsers}</p>
					<h3 class="info-box-number">1,234</h3>
				</div>
			</div>
		</div>
		
		<div class="col-md-3">
			<div class="info-box" style="border-left: 4px solid #2ed573;">
				<div class="info-box-icon" style="background: linear-gradient(135deg, #2ed573 0%, #7bed9f 100%);">
					📦
				</div>
				<div class="info-box-content">
					<p class="info-box-text">{t.dashboard.products}</p>
					<h3 class="info-box-number">567</h3>
				</div>
			</div>
		</div>
		
		<div class="col-md-3">
			<div class="info-box" style="border-left: 4px solid #ffa502;">
				<div class="info-box-icon" style="background: linear-gradient(135deg, #ffa502 0%, #ff6348 100%);">
					🛒
				</div>
				<div class="info-box-content">
					<p class="info-box-text">{t.dashboard.orders}</p>
					<h3 class="info-box-number">89</h3>
				</div>
			</div>
		</div>
		
		<div class="col-md-3">
			<div class="info-box" style="border-left: 4px solid #ff4757;">
				<div class="info-box-icon" style="background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);">
					💰
				</div>
				<div class="info-box-content">
					<p class="info-box-text">{t.dashboard.revenue}</p>
					<h3 class="info-box-number">$12,450</h3>
				</div>
			</div>
		</div>
	</div>
	
	<div class="row">
		<div class="col-md-8">
			<div class="card">
				<div class="card-header">
					<h3 class="card-title">{t.dashboard.revenueOverview}</h3>
					<select class="period-select">
						<option>{t.dashboard.last7Days}</option>
						<option>{t.dashboard.last30Days}</option>
						<option>{t.dashboard.last90Days}</option>
					</select>
				</div>
				<div class="card-body">
					<div class="chart-placeholder">
						<div class="chart-bars">
							<div class="bar" style="height: 40%;"></div>
							<div class="bar" style="height: 65%;"></div>
							<div class="bar" style="height: 45%;"></div>
							<div class="bar" style="height: 80%;"></div>
							<div class="bar" style="height: 55%;"></div>
							<div class="bar" style="height: 90%;"></div>
							<div class="bar" style="height: 70%;"></div>
						</div>
						<div class="chart-labels">
							<span>Mon</span>
							<span>Tue</span>
							<span>Wed</span>
							<span>Thu</span>
							<span>Fri</span>
							<span>Sat</span>
							<span>Sun</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="col-md-4">
			<div class="card">
				<div class="card-header">
					<h3 class="card-title">{t.dashboard.topProducts}</h3>
				</div>
				<div class="card-body">
					<div class="product-list">
						<div class="product-item">
							<span class="product-name">Product A</span>
							<span class="product-sales">234 {t.dashboard.sales}</span>
						</div>
						<div class="product-item">
							<span class="product-name">Product B</span>
							<span class="product-sales">189 {t.dashboard.sales}</span>
						</div>
						<div class="product-item">
							<span class="product-name">Product C</span>
							<span class="product-sales">156 {t.dashboard.sales}</span>
						</div>
						<div class="product-item">
							<span class="product-name">Product D</span>
							<span class="product-sales">123 {t.dashboard.sales}</span>
						</div>
						<div class="product-item">
							<span class="product-name">Product E</span>
							<span class="product-sales">98 {t.dashboard.sales}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="row">
		<div class="col-12">
			<div class="card">
				<div class="card-header">
					<h3 class="card-title">{t.dashboard.recentOrders}</h3>
					<a href="/admin/orders" class="btn-link">{t.common.viewAll}</a>
				</div>
				<div class="card-body" style="padding: 0;">
					<table class="data-table">
						<thead>
							<tr>
								<th>{t.dashboard.orderId}</th>
								<th>{t.dashboard.customer}</th>
								<th>{t.dashboard.status}</th>
								<th>{t.dashboard.amount}</th>
								<th>{t.dashboard.date}</th>
								<th>{t.common.actions}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>#ORD-001</td>
								<td>John Doe</td>
								<td><span class="badge badge-success">{t.dashboard.completed}</span></td>
								<td>$299.00</td>
								<td>2026-03-18</td>
								<td>
									<button class="btn-action">👁️</button>
									<button class="btn-action">✏️</button>
									<button class="btn-action">🗑️</button>
								</td>
							</tr>
							<tr>
								<td>#ORD-002</td>
								<td>Jane Smith</td>
								<td><span class="badge badge-warning">{t.dashboard.pending}</span></td>
								<td>$149.00</td>
								<td>2026-03-17</td>
								<td>
									<button class="btn-action">👁️</button>
									<button class="btn-action">✏️</button>
									<button class="btn-action">🗑️</button>
								</td>
							</tr>
							<tr>
								<td>#ORD-003</td>
								<td>Bob Wilson</td>
								<td><span class="badge badge-info">{t.dashboard.processing}</span></td>
								<td>$459.00</td>
								<td>2026-03-16</td>
								<td>
									<button class="btn-action">👁️</button>
									<button class="btn-action">✏️</button>
									<button class="btn-action">🗑️</button>
								</td>
							</tr>
							<tr>
								<td>#ORD-004</td>
								<td>Alice Brown</td>
								<td><span class="badge badge-danger">{t.dashboard.cancelled}</span></td>
								<td>$199.00</td>
								<td>2026-03-15</td>
								<td>
									<button class="btn-action">👁️</button>
									<button class="btn-action">✏️</button>
									<button class="btn-action">🗑️</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.dashboard {
		max-width: 1400px;
		margin: 0 auto;
	}
	
	.row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
		margin-bottom: 20px;
	}
	
	.col-12 {
		grid-column: span 12;
	}
	
	.period-select {
		padding: 5px 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		background: #fff;
		font-size: 14px;
	}
	
	.btn-link {
		color: #667eea;
		text-decoration: none;
		font-size: 14px;
	}
	
	.btn-link:hover {
		text-decoration: underline;
	}
	
	:global(.card-body:has(.chart-placeholder)) {
		padding: 0;
	}
	
	:global(.card-body:has(.data-table)) {
		padding: 0;
	}
	
	.chart-placeholder {
		height: 250px;
		display: flex;
		flex-direction: column;
		padding: 20px;
	}
	
	.chart-bars {
		flex: 1;
		display: flex;
		align-items: flex-end;
		justify-content: space-around;
	}
	
	.bar {
		width: 40px;
		background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
		border-radius: 5px 5px 0 0;
		transition: height 0.3s ease;
	}
	
	.chart-labels {
		display: flex;
		justify-content: space-around;
		padding: 10px 20px;
		color: #666;
		font-size: 12px;
	}
	
	.product-list {
		display: flex;
		flex-direction: column;
	}
	
	.product-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 20px;
		border-bottom: 1px solid #eee;
	}
	
	.product-item:last-child {
		border-bottom: none;
	}
	
	.product-name {
		font-weight: 500;
		color: #333;
	}
	
	.product-sales {
		color: #666;
		font-size: 14px;
	}
	
	.data-table {
		width: 100%;
		border-collapse: collapse;
	}
	
	.data-table th {
		background: #f8f9fa;
		padding: 15px 20px;
		text-align: left;
		font-weight: 600;
		color: #333;
		font-size: 14px;
		border-bottom: 2px solid #eee;
	}
	
	.data-table td {
		padding: 15px 20px;
		border-bottom: 1px solid #eee;
		color: #666;
	}
	
	.data-table tbody tr:hover {
		background: #f8f9fa;
	}
	
	:global(.badge) {
		padding: 5px 10px;
		border-radius: 15px;
		font-size: 12px;
		font-weight: 500;
	}
	
	:global(.badge-success) {
		background: #d4edda;
		color: #155724;
	}
	
	:global(.badge-warning) {
		background: #fff3cd;
		color: #856404;
	}
	
	:global(.badge-info) {
		background: #d1ecf1;
		color: #0c5460;
	}
	
	:global(.badge-danger) {
		background: #f8d7da;
		color: #721c24;
	}
	
	:global(.btn-action) {
		background: none;
		border: 1px solid #ddd;
		padding: 5px 8px;
		border-radius: 4px;
		cursor: pointer;
		margin-right: 5px;
		transition: all 0.2s;
	}
	
	:global(.btn-action:hover) {
		background: #f0f0f0;
		border-color: #ccc;
	}
</style>
