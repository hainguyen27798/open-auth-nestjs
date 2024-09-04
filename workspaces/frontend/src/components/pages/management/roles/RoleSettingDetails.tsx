'use client';

import { App, Button, Form } from 'antd';
import { useTranslations } from 'next-intl';

import { deleteRole, updateRole } from '@/_actions/role.action';
import { FormField, LoadingWrapper } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/lib/store/hook';
import { changeSearchRoleAction, selectCurrentRoleState } from '@/lib/store/slices';
import { useRouter } from '@/navigation';
import type { UpdateRoleDto } from '@/types';

export default function RoleSettingDetails() {
    const $t = useTranslations('roles.details.settings');
    const role = useAppSelector(selectCurrentRoleState);
    const dispatch = useAppDispatch();
    const { notification, modal } = App.useApp();
    const router = useRouter();

    const onDelete = () => {
        modal.confirm({
            title: $t('confirm_delete'),
            okType: 'danger',
            okText: $t('delete_btn'),
            onOk: async () => {
                if (role.data?.id) {
                    const rs = await deleteRole(role.data?.id);

                    if (rs?.error) {
                        notification.error({
                            message: rs.message,
                            showProgress: true,
                        });
                    } else {
                        notification.success({
                            message: rs.message,
                            showProgress: true,
                        });
                        dispatch(changeSearchRoleAction({ reload: Date.now() }));
                        router.push('..');
                    }
                }
            },
        });
    };

    const onSaveRole = (form: UpdateRoleDto) => {
        if (role.data?.id) {
            updateRole(role.data.id, form).then((rs) => {
                if (rs?.error) {
                    notification.error({
                        message: rs.message,
                        showProgress: true,
                    });
                } else {
                    notification.success({
                        message: rs.message,
                        showProgress: true,
                    });
                    dispatch(changeSearchRoleAction({ reload: Date.now() }));
                }
            });
        }
    };

    return (
        <LoadingWrapper loading={role.isLoading}>
            <div className="pt-6">
                <Form className="max-w-md pt-4" layout="vertical" onFinish={onSaveRole}>
                    <FormField<UpdateRoleDto>
                        defaultValue={role.data?.name}
                        name="name"
                        label={$t('name')}
                        disable={!role.data?.canModify}
                        rules={[{ required: true }]}
                    />
                    <FormField<UpdateRoleDto>
                        defaultValue={role.data?.description}
                        name="description"
                        type="textarea"
                        label={$t('description')}
                    />
                    <Button type="primary" className="mt-4 px-6" htmlType="submit">
                        {$t('save_btn')}
                    </Button>
                </Form>
            </div>
            {role.data?.canModify && (
                <div className="flex flex-col gap-4 pt-10">
                    <div className="text-2xl font-medium">{$t('danger_zone')}</div>
                    <div className="flex items-center justify-between gap-4 rounded bg-red-100 p-6 py-4">
                        <div className="flex flex-col gap-1.5">
                            <div className="text-base font-medium text-red-900">{$t('delete_role')}</div>
                            <div className=" text-red-900">{$t('confirm')}</div>
                        </div>
                        <Button type="primary" className="px-6" danger onClick={onDelete}>
                            {$t('delete_btn')}
                        </Button>
                    </div>
                </div>
            )}
        </LoadingWrapper>
    );
}
