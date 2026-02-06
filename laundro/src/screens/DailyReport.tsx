import { mockDailyOrders } from '../services/mockReports'
import { useTranslation } from 'react-i18next'

export default function DailyReport() {
  const { t } = useTranslation()

  return (
    <div>
      <h2>{t('report.title')}</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">{t('report.room')}</th>
            <th align="left">{t('report.phone')}</th>
            <th align="left">{t('report.items')}</th>
            <th align="right">{t('report.amount')}</th>
          </tr>
        </thead>

        <tbody>
          {mockDailyOrders.map(order => {
            const totalItems = order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            )

            return (
              <tr key={order.id}>
                <td>{order.customer.roomNumber}</td>
                <td>{order.customer.phone}</td>
                <td>{totalItems}</td>
                <td align="right">₹{order.total}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}