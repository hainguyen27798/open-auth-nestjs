import { ExtractTokenHandler } from '@/modules/token/commands/extract-token.command';
import { FindTokenHandler } from '@/modules/token/commands/find-token.command';
import { GenerateTokenHandler } from '@/modules/token/commands/generate-token.command';
import { ProvideNewTokenHandler } from '@/modules/token/commands/provide-new-token.command';
import { RemoveTokenHandler } from '@/modules/token/commands/remove-token.command';
import { VerifyTokenHandler } from '@/modules/token/commands/verify-token.command';

export * from './extract-token.command';
export * from './find-token.command';
export * from './generate-token.command';
export * from './provide-new-token.command';
export * from './remove-token.command';
export * from './verify-token.command';

export const handlers = [
    ExtractTokenHandler,
    FindTokenHandler,
    GenerateTokenHandler,
    ProvideNewTokenHandler,
    RemoveTokenHandler,
    VerifyTokenHandler,
];
