package FileUtils.naviteCode;

import java.io.FilterInputStream;
import java.io.IOException;

import java.io.InputStream;
import java.util.concurrent.atomic.AtomicReferenceFieldUpdater;

public class BufferedInputStream extends FilterInputStream {

    // Ĭ�ϵĻ����С��8192�ֽ�
    // BufferedInputStream ����ݡ���������С������ε���仺������
    // ����BufferedInputStream��仺�������û���ȡ������������֮��BufferedInputStream���ٴ���仺���������ѭ����ֱ����������...
    private static int defaultBufferSize = 8192;

    // ��������
    protected volatile byte buf[];

    // ���������ԭ�Ӹ�������
    // �ó�Ա������buf�����volatile�ؼ��ֹ�ͬ�����buf�����ԭ�Ӹ��¹���ʵ�֣�
    // �����ڶ��߳��в���BufferedInputStream����ʱ��buf��bufUpdater������ԭ����(��ͬ���̷߳��ʵ������ݶ�����ͬ��)
    private static final
    AtomicReferenceFieldUpdater<BufferedInputStream, byte[]> bufUpdater =
            AtomicReferenceFieldUpdater.newUpdater
                    (BufferedInputStream.class,  byte[].class, "buf");

    // ��ǰ����������Ч�ֽ�����
    // ע�⣬������ָ����������Ч�ֽ������������������е���Ч�ֽ�����
    protected int count;

    // ��ǰ��������λ������
    // ע�⣬������ָ��������λ���������������������е�λ��������
    protected int pos;

    // ��ǰ�������ı��λ��
    // markpos��reset()���ʹ�ò������塣�������裺
    // (01) ͨ��mark() ����������pos��ֵ��markpos�С�
    // (02) ͨ��reset() �������Ὣpos��ֵ����Ϊmarkpos������ͨ��read()��ȡ����ʱ���ͻ��mark()�����λ�ÿ�ʼ��ȡ��
    protected int markpos = -1;

    // marklimit�Ǳ�ǵ����ֵ��
    // ����marklimit��ԭ�������ں����fill()���������л���ϸ˵����������BufferedInputStream�൱��Ҫ��
    protected int marklimit;

    // ��ȡ������
    private InputStream getInIfOpen() throws IOException {
        InputStream input = in;
        if (input == null)
            throw new IOException("Stream closed");
        return input;
    }

    // ��ȡ����
    private byte[] getBufIfOpen() throws IOException {
        byte[] buffer = buf;
        if (buffer == null)
            throw new IOException("Stream closed");
        return buffer;
    }

    // ���캯�����½�һ����������СΪ8192��BufferedInputStream
    public BufferedInputStream(InputStream in) {
        this(in, defaultBufferSize);
    }

    // ���캯�����½�ָ����������С��BufferedInputStream
    public BufferedInputStream(InputStream in, int size) {
        super(in);
        if (size <= 0) {
            throw new IllegalArgumentException("Buffer size <= 0");
        }
        buf = new byte[size];
    }

    // �ӡ����������ж�ȡ���ݣ�����䵽�������С�
    // �����Ըú���������ϸ˵����
    private void fill() throws IOException {
        byte[] buffer = getBufIfOpen();
        if (markpos < 0)
            pos = 0;            /* no mark: throw away the buffer */
        else if (pos >= buffer.length)  /* no room left in buffer */
            if (markpos > 0) {  /* can throw away early part of the buffer */
                int sz = pos - markpos;
                System.arraycopy(buffer, markpos, buffer, 0, sz);
                pos = sz;
                markpos = 0;
            } else if (buffer.length >= marklimit) {
                markpos = -1;   /* buffer got too big, invalidate mark */
                pos = 0;        /* drop buffer contents */
            } else {            /* grow buffer */
                int nsz = pos * 2;
                if (nsz > marklimit)
                    nsz = marklimit;
                byte nbuf[] = new byte[nsz];
                System.arraycopy(buffer, 0, nbuf, 0, pos);
                if (!bufUpdater.compareAndSet(this, buffer, nbuf)) {
                    throw new IOException("Stream closed");
                }
                buffer = nbuf;
            }
        count = pos;
        int n = getInIfOpen().read(buffer, pos, buffer.length - pos);
        if (n > 0)
            count = n + pos;
    }

    // ��ȡ��һ���ֽ�
    public synchronized int read() throws IOException {
        // ���Ѿ����껺�����е����ݣ������fill()����������ȡ��һ������������仺����
        if (pos >= count) {
            fill();
            if (pos >= count)
                return -1;
        }
        // �ӻ������ж�ȡָ�����ֽ�
        return getBufIfOpen()[pos++] & 0xff;
    }

    // ���������е�����д�뵽�ֽ�����b�С�off���ֽ�����b����ʼλ�ã�len��д�볤��
    private int read1(byte[] b, int off, int len) throws IOException {
        int avail = count - pos;
        if (avail <= 0) {
            // ���ٻ��ơ�
            // �����ȡ�ĳ��ȴ��ڻ������ĳ��� ����û��markpos��
            // ��ֱ�Ӵ�ԭʼ�������н��ж�ȡ���Ӷ�������ν��COPY����ԭʼ������������������ȡ������ȫ�����ݣ���ջ�������
            //  ��������ԭʼ���������ݣ�
            if (len >= getBufIfOpen().length && markpos < 0) {
                return getInIfOpen().read(b, off, len);
            }
            // ���Ѿ����껺�����е����ݣ������fill()����������ȡ��һ������������仺����
            fill();
            avail = count - pos;
            if (avail <= 0) return -1;
        }
        int cnt = (avail < len) ? avail : len;
        System.arraycopy(getBufIfOpen(), pos, b, off, cnt);
        pos += cnt;
        return cnt;
    }

    // ���������е�����д�뵽�ֽ�����b�С�off���ֽ�����b����ʼλ�ã�len��д�볤��
    public synchronized int read(byte b[], int off, int len)
            throws IOException
    {
        getBufIfOpen(); // Check for closed stream
        if ((off | len | (off + len) | (b.length - (off + len))) < 0) {
            throw new IndexOutOfBoundsException();
        } else if (len == 0) {
            return 0;
        }

        // ��ȡ��ָ�����ȵ����ݲŷ���
        int n = 0;
        for (;;) {
            int nread = read1(b, off + n, len - n);
            if (nread <= 0)
                return (n == 0) ? nread : n;
            n += nread;
            if (n >= len)
                return n;
            // if not closed but no bytes available, return
            InputStream input = in;
            if (input != null && input.available() <= 0)
                return n;
        }
    }

    // ����n���ֽ�
    public synchronized long skip(long n) throws IOException {
        getBufIfOpen(); // Check for closed stream
        if (n <= 0) {
            return 0;
        }
        long avail = count - pos;

        if (avail <= 0) {
            // If no mark position set then don't keep in buffer
            if (markpos <0)
                return getInIfOpen().skip(n);

            // Fill in buffer to save bytes for reset
            fill();
            avail = count - pos;
            if (avail <= 0)
                return 0;
        }

        long skipped = (avail < n) ? avail : n;
        pos += skipped;
        return skipped;
    }

    // ��һ���ֽ��Ƿ��ɶ�
    public synchronized int available() throws IOException {
        int n = count - pos;
        int avail = getInIfOpen().available();
        return n > (Integer.MAX_VALUE - avail)
                ? Integer.MAX_VALUE
                : n + avail;
    }

    // ��ǡ����������е�ǰλ�á�
    // readlimit��marklimit������marklimit�����ã��ο������˵����
    public synchronized void mark(int readlimit) {
        marklimit = readlimit;
        markpos = pos;
    }

    // �������������е�ǰλ�����õ�mark()����ǵ�λ��
    public synchronized void reset() throws IOException {
        getBufIfOpen(); // Cause exception if closed
        if (markpos < 0)
            throw new IOException("Resetting to invalid mark");
        pos = markpos;
    }

    public boolean markSupported() {
        return true;
    }

    // �ر�������
    public void close() throws IOException {
        byte[] buffer;
        while ( (buffer = buf) != null) {
            if (bufUpdater.compareAndSet(this, buffer, null)) {
                InputStream input = in;
                in = null;
                if (input != null)
                    input.close();
                return;
            }
            // Else retry in case a new buf was CASed in fill()
        }
    }
}