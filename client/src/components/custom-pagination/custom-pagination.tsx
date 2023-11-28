import {Flex, Pagination} from 'antd';

import styles from './custom-pagination.module.scss';

type Props = {
  total: any,
  pageSize: any,
  current: any,
  onChange: any
}

export const PaginationComponent = ({total, pageSize, current, onChange}: Props) => {
  return (
    <>
      {total > pageSize && (
        <Flex justify="center" style={{marginTop: '16px'}}>
          <Pagination
            showSizeChanger={false}
            total={total}
            pageSize={pageSize}
            current={current}
            onChange={onChange}
          />
        </Flex>
      )}
    </>
  );
};

