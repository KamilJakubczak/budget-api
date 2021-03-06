from django.contrib import admin
from .models import Category, Tag, Payment
from .models import Transaction, TransactionType, PaymentInitial
import datetime
# Register your models here.
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Payment)
admin.site.register(TransactionType)


@admin.register(PaymentInitial)
class PaymentIntialAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'payment',
        'amount'
    )


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):

    def date(self, date):
        return date.transaction_date.strftime("%Y-%m-%d")

    list_display = (
        'user',
        'date',
        'category',
        'tag',
        'description',
        'payment_target',
        'payment_source',
        'amount',
        'transaction_type')

    list_filter = (
        'transaction_date',
        'category',
        'tag',
        'payment_target',
        'payment_source',
        'transaction_type',
        'amount'
    )
