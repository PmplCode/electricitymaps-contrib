import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useShare } from 'hooks/useShare';
import { useEvents, useSocialShareEvents, useTrackEvent } from 'hooks/useTrackEvent';
import { ExternalLink, FileDownIcon, Link } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaLinkedin, FaReddit, FaSquareXTwitter } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import {
  baseUrl,
  Charts,
  DEFAULT_ICON_SIZE,
  DEFAULT_TOAST_DURATION,
} from 'utils/constants';
import { hasMobileUserAgent as hasMobileUA } from 'utils/helpers';

import { MemoizedShareIcon } from './ShareIcon';
import { TimeDisplay } from './TimeDisplay';
import { Toast, useToastReference } from './Toast';

export interface MoreOptionsDropdownProps {
  children: React.ReactElement;
  shareUrl?: string;
  hasMobileUserAgent?: boolean;
  isEstimated?: boolean;
  title?: string;
  id: Charts | 'zone';
}

const dropdownItemStyle = 'flex items-center gap-2 py-2';
const dropdownContentStyle = 'font-semibold text-xs';

export function MoreOptionsDropdown({
  children,
  shareUrl = baseUrl,
  hasMobileUserAgent = hasMobileUA(),
  isEstimated = false,
  title,
  id,
}: MoreOptionsDropdownProps) {
  const { zoneId } = useParams();
  const { t } = useTranslation();
  const [toastMessage, setToastMessage] = useState('');
  const { isOpen, onToggleDropdown } = useDropdownCtl();
  const reference = useToastReference();
  const { copyToClipboard, share } = useShare();

  const downloadUrl = `https://portal.electricitymaps.com/datasets/${zoneId}?utm_source=app&utm_medium=download_button&utm_campaign=csv_download`;

  const trackEvent = useTrackEvent();
  const { trackCsvLink } = useEvents(trackEvent);
  const {
    trackSocialShareDirectLink,
    trackSocialShareFacebook,
    trackSocialShareLinkedIn,
    trackSocialShareReddit,
    trackSocialShareX,
  } = useSocialShareEvents(trackEvent, id === 'zone' ? undefined : id);

  const handleCsvDownloadClick = useCallback(() => {
    window.open(downloadUrl, '_blank');
    trackCsvLink();
  }, [downloadUrl, trackCsvLink]);

  const handleCsvDownloadKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter') {
        window.open(downloadUrl, '_blank');
        trackCsvLink();
      }
    },
    [downloadUrl, trackCsvLink]
  );

  const summary = t('more-options-dropdown.summary');

  const { onShare, copyShareUrl } = useMemo(() => {
    const toastMessageCallback = (message: string) => {
      setToastMessage(message);
      reference.current?.publish();
    };

    return {
      copyShareUrl: () => {
        copyToClipboard(shareUrl, toastMessageCallback);
        trackSocialShareDirectLink();
      },
      onShare: () => {
        share(
          {
            title: 'Electricity Maps',
            text: summary,
            url: shareUrl,
          },
          toastMessageCallback
        );
      },
    };
  }, [reference, shareUrl, summary, share, copyToClipboard, trackSocialShareDirectLink]);

  const dropdownTitle = title || t('more-options-dropdown.title');

  const copyLinkText = t(
    `more-options-dropdown.${id === 'zone' ? 'copy-zone-link' : 'copy-chart-link'}`
  );

  return (
    <>
      <DropdownMenu.Root onOpenChange={onToggleDropdown} open={isOpen} modal={false}>
        <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
        <DropdownMenu.Content
          className={twMerge(
            'z-30 my-3 w-64 min-w-60 rounded-2xl border border-neutral-200 bg-white shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
            hasMobileUserAgent ? 'mx-7' : '-translate-x-[42%]'
          )}
        >
          {isEstimated && (
            <div className="w-full rounded-t-2xl bg-warning/10 p-3 text-xs font-semibold text-warning dark:bg-warning-dark/10 dark:text-warning-dark">
              <p>{t('more-options-dropdown.preliminary-data')}</p>
            </div>
          )}
          <div className="px-2 py-2">
            <DropdownMenu.Label className=" flex justify-between">
              <button
                className="flex w-full justify-between p-2"
                onClick={handleCsvDownloadClick}
                onKeyDown={handleCsvDownloadKeyDown}
              >
                <div className="my-auto flex items-center">
                  <FileDownIcon size={DEFAULT_ICON_SIZE} />
                  <div className="ml-2 text-sm font-semibold">
                    {t('more-options-dropdown.download')}
                  </div>
                </div>
                <ExternalLink
                  size={DEFAULT_ICON_SIZE}
                  className="text-neutral-500 opacity-80"
                />
              </button>
            </DropdownMenu.Label>
            <DropdownMenu.Separator className="my-1 h-px bg-neutral-200 dark:bg-neutral-700" />
            <DropdownMenu.Group className="flex cursor-pointer flex-col px-2">
              <DropdownMenu.Item className={dropdownItemStyle}>
                <div className="flex flex-col">
                  <div className="align-items flex justify-between">
                    <h2 className="self-start text-sm">{dropdownTitle}</h2>
                  </div>
                  <TimeDisplay className="whitespace-nowrap text-xs text-neutral-600 dark:text-neutral-300" />
                </div>
              </DropdownMenu.Item>
              <DropdownMenu.Item className={dropdownItemStyle} onSelect={copyShareUrl}>
                <Link size={DEFAULT_ICON_SIZE} />
                <p className={dropdownContentStyle}>{copyLinkText}</p>
              </DropdownMenu.Item>
              {hasMobileUserAgent && (
                <DropdownMenu.Item className={dropdownItemStyle} onSelect={onShare}>
                  <MemoizedShareIcon />
                  <p className={dropdownContentStyle}>
                    {t('more-options-dropdown.mobile-share-via')}
                  </p>
                </DropdownMenu.Item>
              )}
              {!hasMobileUserAgent && (
                <>
                  <a
                    data-testid="twitter-chart-share"
                    target="_blank"
                    rel="noopener"
                    onClick={trackSocialShareX}
                    href={`https://twitter.com/intent/tweet?&url=${shareUrl}&text=${encodeURI(
                      summary
                    )}&hashtags=electricitymaps`}
                  >
                    <DropdownMenu.Item className={dropdownItemStyle}>
                      <FaSquareXTwitter size={DEFAULT_ICON_SIZE} />
                      <p className={dropdownContentStyle}>{t('button.twitter-share')}</p>
                    </DropdownMenu.Item>
                  </a>
                  <a
                    data-testid="facebook-chart-share"
                    target="_blank"
                    rel="noopener"
                    onClick={trackSocialShareFacebook}
                    href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURI(
                      summary
                    )}`}
                  >
                    <DropdownMenu.Item className={dropdownItemStyle}>
                      <FaFacebook size={DEFAULT_ICON_SIZE} />
                      <p className={dropdownContentStyle}>{t('button.facebook-share')}</p>
                    </DropdownMenu.Item>
                  </a>
                  <a
                    data-testid="linkedin-chart-share"
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener"
                    onClick={trackSocialShareLinkedIn}
                  >
                    <DropdownMenu.Item className={dropdownItemStyle}>
                      <FaLinkedin size={DEFAULT_ICON_SIZE} />
                      <p className={dropdownContentStyle}>{t('button.linkedin-share')}</p>
                    </DropdownMenu.Item>
                  </a>
                  <a
                    data-testid="reddit-chart-share"
                    href={`https://www.reddit.com/web/submit?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener"
                    onClick={trackSocialShareReddit}
                  >
                    <DropdownMenu.Item className={dropdownItemStyle}>
                      <FaReddit size={DEFAULT_ICON_SIZE} />
                      <p className={dropdownContentStyle}>{t('button.reddit-share')}</p>
                    </DropdownMenu.Item>
                  </a>
                </>
              )}
            </DropdownMenu.Group>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Toast
        ref={reference}
        description={toastMessage}
        isCloseable={true}
        toastCloseText={t('misc.dismiss')}
        duration={DEFAULT_TOAST_DURATION}
      />
    </>
  );
}

export const useDropdownCtl = () => {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useMemo(
    () => ({
      onDismiss: () => setIsOpen(false),
      onToggleDropdown: () => setIsOpen((previous) => !previous),
    }),
    [setIsOpen]
  );

  return { isOpen, ...methods };
};
